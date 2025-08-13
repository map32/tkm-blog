import React, { useState } from "react";

const api = (path) => (window.location.origin.includes(":8080") ? "http://localhost:8080" : "") + path;

export default function BlogEditor({ token }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  async function post() {
    if (!token) { alert("Login first (use /api/auth/bootstrap or env vars)"); return; }
    const res = await fetch(api("/api/posts"), {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ title, body_markdown: body })
    });
    if (res.ok) { setTitle(""); setBody(""); alert("Posted!"); }
    else alert("Failed");
  }

  return (
    <div>
      <h2 style={{marginTop:0}}>New Post</h2>
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea rows={8} placeholder="Write in Markdown…" value={body} onChange={e=>setBody(e.target.value)} />
      <div style={{display:"flex", gap:".5rem"}}>
        <button onClick={post}>Publish</button>
      </div>
      <p style={{opacity:.7, fontSize:".85rem"}}>
        Tip: You can seed an admin via <code>GET /api/auth/bootstrap</code> (uses ADMIN_USER/ADMIN_PASS envs).
      </p>
    </div>
  );
}