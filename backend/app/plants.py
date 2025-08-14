from fastapi import APIRouter, HTTPException
from typing import List, Optional
import json, os
from functools import lru_cache

router = APIRouter(prefix="/api/plants", tags=["plants"])

DATA_PATH = os.getenv("PLANTS_FILE", "/app/data/plants.json")

@lru_cache(maxsize=1)
def load_data():
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)
        # Expect list of objects with fields: id, name_en, name_ko, synonyms, parts_used, indications, safety, refs, etc.
        return data

@router.get("")
def list_plants(q: Optional[str] = None, limit: int = 50, offset: int = 0):
    items = load_data()
    if q:
        ql = q.lower()
        def hit(p):
            text = " ".join([
                str(p.get("name_en", "")), str(p.get("name_ko", "")), str(p.get("name_latin","")),
                " ".join(p.get("synonyms", []) or []), str(p.get("indications_efficacy_effects", "")),
            ]).lower()
            return ql in text
        items = [p for p in items if hit(p)]
    return {"total": len(items), "items": items[offset:offset+limit]}

@router.get("/{pid}")
def get_plant(pid: str):
    for p in load_data():
        if str(p.get("id")) == str(pid):
            return p
    raise HTTPException(404, "Plant not found")