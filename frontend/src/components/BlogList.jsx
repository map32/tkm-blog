import React, { useEffect, useState, useContext } from "react";
import { BlogContext } from "../App";
import { marked } from "marked";

const api = (path) => (window.location.origin.includes(":8080") ? "http://localhost:8080" : "") + path;

export default function BlogList() {
  const {posts, setPosts} = useContext(BlogContext);
  async function load() {
    const r = await fetch(api("/api/posts"));
    const d = await r.json();
    setPosts(d);
  }
  useEffect(()=>{ load(); },[posts]);
  return (
    <div>
      <h2 style={{marginTop:0}}>Recent Posts</h2>
      {posts.map(p => (
        <article key={p.id} className="card">
          <h3 style={{marginTop:0}}>{p.title}</h3>
          <div dangerouslySetInnerHTML={{__html: marked.parse(p.body_markdown || "")}} />
          <div style={{opacity:.7, fontSize:".85rem"}}>Posted {new Date(p.created_at).toLocaleString()}</div>
        </article>
      ))}
    </div>
  );
}