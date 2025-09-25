import React, { useContext, useState, useEffect } from "react";
import { BlogContext } from "../App";

const api = (path) => (window.location.origin.includes(":8080") ? "http://localhost:8080" : "") + path;

export default function BlogEditor({ token, postToEdit, setPostToEdit }) {
  const {posts, setPosts} = useContext(BlogContext);
  const [title, setTitle] = useState(postToEdit?.title ?? "");
  const [body, setBody] = useState(postToEdit?.body_markdown ?? "");

  useEffect(() => {if (!!postToEdit) {setTitle(postToEdit.title); setBody(postToEdit.body_markdown)} else {setTitle(''); setBody('')}}, [postToEdit])

  async function post() {
    if (!token) { alert("Login first (use /api/auth/bootstrap or env vars)"); return; }
    const res = await fetch(api("/api/posts"), {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ title, body_markdown: body })
    });
    if (res.ok) { setTitle(""); setBody(""); const d = await res.json(); setPosts([...posts, d]); alert("Posted!"); }
    else alert("Failed");
  }

  async function update() {
    if (!token) { alert("Login first (use /api/auth/bootstrap or env vars)"); return; }
    const res = await fetch(api(`/api/posts/${postToEdit.id}`), {
      method: "PUT",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ title, body_markdown: body })
    });
    if (res.ok) { 
      setTitle(""); setBody("");
      const d = await res.json();
      const i = posts.findIndex(item => item.id === i);
      setPosts(posts.toSpliced(i, 1, d));
      alert("Edited!");
    }
    else alert("Failed");
  }

  const handleSubmit = () => {
    if (postToEdit) update();
    else post();
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent:'space-between', alignItems: 'center'}}>
        <h2 style={{marginTop:0}}>{!!postToEdit ? 'Edit Post' : 'New Post'}</h2>
        {!!postToEdit ? <button onClick={() => {setPostToEdit(null)}}>Cancel</button> : null }
      </div>
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea rows={8} placeholder="Write in Markdown…" value={body} onChange={e=>setBody(e.target.value)} />
      <div style={{display:"flex", gap:".5rem"}}>
        <button onClick={handleSubmit}>{!!postToEdit ? 'Edit' : 'Publish'}</button>
      </div>
      <p style={{opacity:.7, fontSize:".85rem"}}>
        Tip: Seed an admin via <code>GET /api/auth/bootstrap</code> (uses ADMIN_USER/ADMIN_PASS envs).
      </p>
    </div>
  );
}