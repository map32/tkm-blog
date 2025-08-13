import React, { useEffect, useState } from "react";

const api = (path) => (window.location.origin.includes(":8080") ? "http://localhost:8080" : "") + path;

export default function PlantSearch({ onSelect }) {
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  async function search() {
    const res = await fetch(api(`/api/plants?q=${encodeURIComponent(q)}&limit=60`));
    const data = await res.json();
    setItems(data.items || []);
    setTotal(data.total || 0);
  }

  useEffect(() => { search(); }, []);

  return (
    <div>
      <h2 style={{marginTop:0}}>Materia Medica</h2>
      <p>Search across Korean & English names, synonyms and indications.</p>
      <div style={{display:"flex", gap:".5rem"}}>
        <input placeholder="Search plants... (e.g., ginseng, 인삼, cough)" value={q} onChange={e=>setQ(e.target.value)} onKeyDown={(e)=> e.key==='Enter' && search()} />
        <button onClick={search}>Search</button>
      </div>
      <p style={{opacity:.8, fontSize:".9rem"}}>Total matches: {total}</p>
      <div className="grid cols-3">
        {items.map(p => (
          <div key={p.id} className="card" onClick={()=>onSelect(p)} style={{cursor:"pointer"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
              <strong>{p.name_en || "Unnamed"}</strong>
              <span className="badge">{p.name_ko}</span>
            </div>
            {p.common_name && <div style={{opacity:.8}}>{p.common_name}</div>}
            {p.indications && <div style={{marginTop:".5rem", fontSize:".9rem", opacity:.9}}>{String(p.indications).slice(0,140)}{String(p.indications).length>140?"…":""}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}