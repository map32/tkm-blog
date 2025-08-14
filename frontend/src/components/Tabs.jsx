import React from "react";

export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="tabs">
      {tabs.map(t => (
        <button key={t.key} className={`tab ${active===t.key? 'active':''}`} onClick={()=>onChange(t.key)}>
          {t.icon && <span style={{marginRight:6}}>{t.icon}</span>}
          {t.label}
        </button>
      ))}
    </div>
  );
}