import React, { useEffect, useState } from "react";
import PlantCard from "./PlantCard";

const api = (path) => (window.location.origin.includes(":8080") ? "http://localhost:8080" : "") + path;

export default function PlantDetail({ id, plant }) {
  const [data, setData] = useState(plant || null);
  useEffect(() => {
    if (!id) { setData(null); return; }
    if (plant) { setData(plant); return; }
    fetch(api(`/api/plants/${id}`)).then(r=>r.json()).then(setData);
  }, [id]);

  if (!data) return <div><h2 style={{marginTop:0}}>Details</h2><p>Select a plant to see details.</p></div>;

  const Row = ({label, value}) => value ? (<p><strong>{label}:</strong> {value}</p>) : null;

  return (
    <div>
      <h2 style={{marginTop:0}}>{data.name_en ?? data.name_latin} <span className="badge">{data.name_ko}</span></h2>
      {/*data.name_latin && <div style={{opacity:.8}}>{data.name_latin}</div>*/}
      {Array.isArray(data.img_links) && data.img_links.length>0 && (
        <div style={{display:"flex", gap:".5rem", flexWrap:"wrap", margin:".5rem 0"}}>
          {data.img_links.slice(0,4).map((src,i) => (
            <PlantCard plant={plant} index={i} />
          ))}
        </div>
      )}
      <Row label="Family" value={data.family} />
      <Row label="Part" value={data.medicinal_part} />
      <Row label="Taste" value={data.taste} />
      <Row label="Odor" value={data.odor} />
      <Row label="Pharmacopoeia" value={data.pharmacopeia} />
      <Row label="Source species" value={data.source_species} />
      <Row label="Description" value={data.description} />
      <Row label="Harvest & Processing" value={data.harvest_and_processing} />
      <Row label="Indications (traditional)" value={data.indications_efficacy_effects} />
      <Row label="Dosage & Administration" value={data.dosage_and_administration} />
      <Row label="Storage" value={data.storage} />
      <Row label="Precautions" value={data.precautions} />
      {Array.isArray(data.references) && data.references.length>0 && (
        <p><strong>References:</strong> {data.references.join(", ")}</p>
      )}
    </div>
  );
}