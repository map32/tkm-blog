import json
import os
import requests
from sqlmodel import Session, select
from app.database import init_db, engine
from app.models import MedicinalPlant

STATIC_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'static', 'plants')
DATA_PATH = os.getenv("PLANTS_FILE", "/app/data/plants.json")
BASE_URL = 'https://nifds.go.kr'
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
}

def ensure_static_dir():
    os.makedirs(STATIC_DIR, exist_ok=True)


def download_image(url, plant_id, index):
    try:
        ext = ".jpg"
        filename = f"{plant_id}_{index}{ext}"
        filepath = os.path.join(STATIC_DIR, filename)

        if os.path.exists(filepath):
            return f"/static/plants/{filename}"

        resp = requests.get(BASE_URL + url, headers=HEADERS, timeout=10)
        resp.raise_for_status()

        with open(filepath, "wb") as f:
            f.write(resp.content)

        print(f"📥 Downloaded: {filename}")
        return f"/static/plants/{filename}"
    except Exception as e:
        print(f"⚠ Failed to download {BASE_URL + url}: {e}")
        return None


def load_data(json_path):
    with open(json_path, "r", encoding="utf-8") as f:
        return json.load(f)


def import_plants(data):
    ensure_static_dir()
    with Session(engine) as session:
        for entry in data:
            local_images = []
            for idx, link in enumerate(entry.get("img_links", [])):
                local_path = download_image(link, entry["id"], idx)
                if local_path:
                    local_images.append(local_path)

            # Check for duplicates
            existing = session.exec(select(MedicinalPlant).where(MedicinalPlant.id == entry["id"])).first()
            if existing:
                print(f"⏩ Skipping duplicate: {entry.get('name_en')} (ID {entry['id']})")
                continue

            plant = MedicinalPlant(
                id=entry.get("id"),
                name_ko=entry.get("name_ko"),
                name_latin=entry.get("name_latin"),
                name_en=entry.get("name_en"),
                pharmacopeia=entry.get("pharmacopeia"),
                source_species=entry.get("source_species"),
                family=entry.get("family"),
                medicinal_part=entry.get("medicinal_part"),
                odor=entry.get("odor"),
                taste=entry.get("taste"),
                description=entry.get("description"),
                harvest_and_processing=entry.get("harvest_and_processing"),
                indications_efficacy_effects=entry.get("indications_efficacy_effects"),
                dosage_and_administration=entry.get("dosage_and_administration"),
                storage=entry.get("storage"),
                herbal_material_code=entry.get("herbal_material_code"),
                synonyms=entry.get("synonyms"),
                precautions=entry.get("precautions"),
                references=entry.get("references", []),
                img_links=local_images
            )

            session.add(plant)

        session.commit()
        print("✅ Import completed successfully with local images.")

if __name__ == "__main__":
    init_db()
    json_file = DATA_PATH  # Path to your JSON file
    data = load_data(json_file)
    import_plants(data)