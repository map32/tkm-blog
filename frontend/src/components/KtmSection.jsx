import React, { useState } from "react";
import { ktmPages } from "../ktmContent";
import { marked } from "marked";

export default function KtmSection(){
  const [active, setActive] = useState(ktmPages[0].key);
  const current = ktmPages.find(p=>p.key===active);

  return (
    <div className="ktm">
      <div className="sidebar">
        {ktmPages.map(p => (
          <button key={p.key} className={active===p.key? 'active':''} onClick={()=>setActive(p.key)}>
            {p.title}
          </button>
        ))}
      </div>
      <div className="content">
        <h2 style={{marginTop:0}}>{current.title}</h2>
        <div style={{opacity:.85}} dangerouslySetInnerHTML={{__html: marked.parse(current.body)}} />
        <p style={{marginTop:"1rem", fontSize:"0.9rem", opacity:.7}}>
          Disclaimer: This section is for **education** and not a substitute for professional medical care.
        </p>
      </div>
    </div>
  );
}