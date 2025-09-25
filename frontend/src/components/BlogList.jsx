import React, { useEffect, useState, useContext } from "react";
import { BlogContext } from "../App";
import { marked } from "marked";

const api = (path) => (window.location.origin.includes(":8080") ? "http://localhost:8080" : "") + path;

export default function BlogList({id, setPostToEdit}) {
  const {posts, setPosts} = useContext(BlogContext);
  async function load() {
    const r = await fetch(api("/api/posts"));
    const d = await r.json();
    setPosts(d);
  }

  async function del(id) {
    if (!token) { alert("Login first (use /api/auth/bootstrap or env vars)"); return; }
    const res = await fetch(api(`/api/posts/${id}`), {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
    });
    if (res.ok) { 
      setTitle(""); setBody("");
      alert("Deleted!");
    }
    else alert("Failed");
  }
  useEffect(()=>{ load(); },[]);
  return (
    <div>
      <h2 style={{marginTop:0}}>Recent Posts</h2>
      {posts.map(p => (
        <article key={p.id} className="card">
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h3 style={{marginTop:0}}>{p.title}</h3>
            {
              id && id === p.id ? 
              <div className={{display: 'flex', gap:4, alignItems: 'center'}}>
                <button className='icon' onClick={() => setPostToEdit(p)}>
                  <img src='/edit.svg' width='1rem' height='1rem'/>
                </button>
                <button className='icon' onClick={() => del(p.id)}>
                  <img src='/button.svg'  width='1rem' height='1rem'/>
                </button>
              </div> : null
            }
          </div>
          <div dangerouslySetInnerHTML={{__html: marked.parse(p.body_markdown || "")}} />
          <div style={{opacity:.7, fontSize:".85rem"}}>Posted {new Date(p.created_at).toLocaleString()}</div>
        </article>
      ))}
    </div>
  );
}