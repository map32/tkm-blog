import React, { useEffect, useState } from "react";

const api = (path) => (window.location.origin.includes(":8080") ? "http://localhost:8080" : "") + path;

export default function PlantDetail({ id, plant }) {
  const [data, setData] = useState(plant || null);
  useEffect(() => {
    if (!id) { setData(null); return; }
    if (plant) { setData(plant); return; }
    fetch(api(`/api/plants/${id}`)).then(r=>r.json()).then(setData);
  }, [id]);

  if (!data) return <div><h2 style={{marginTop:0}}>Details</h2><p>Select a plant to see details.</p></div>;

  return (
    <div>
      <h2 style={{marginTop:0}}>{data.name_en} <span className="badge">{data.name_ko}</span></h2>
      {data.synonyms?.length ? <p><em>Synonyms:</em> {data.synonyms.join(", ")}</p> : null}
      {data.parts_used && <p><strong>Parts used:</strong> {data.parts_used}</p>}
      {data.indications && <p><strong>Indications (traditional):</strong> {data.indications}</p>}
      {data.safety && <p><strong>Safety notes:</strong> {data.safety}</p>}
      {data.refs && <p><strong>Refs:</strong> {Array.isArray(data.refs)? data.refs.join(", ") : data.refs}</p>}
    </div>
  );
}