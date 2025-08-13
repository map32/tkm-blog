import React, { useEffect, useState } from "react";
import PlantSearch from "./components/PlantSearch.jsx";
import PlantDetail from "./components/PlantDetail.jsx";
import BlogList from "./components/BlogList.jsx";
import BlogEditor from "./components/BlogEditor.jsx";

const api = (path) => (window.location.origin.includes(":8080") ? "http://localhost:8080" : "") + path;

export default function App() {
  const [selected, setSelected] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const [auth, setAuth] = useState({ username: "", password: "" });

  const login = async (e) => {
    e.preventDefault();
    const body = new URLSearchParams();
    body.append("username", auth.username);
    body.append("password", auth.password);
    const res = await fetch(api("/api/auth/login"), { method: "POST", body });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      setToken(data.access_token);
    } else {
      alert("Login failed");
    }
  };

  return (
    <>
      <div className="header">
        <div className="container" style={{display:"flex", gap:"1rem", alignItems:"center", justifyContent:"space-between"}}>
          <h1 style={{margin:0,fontSize:"1.1rem"}}>Korean Traditional Medicine — Materia Medica & Blog</h1>
          {token ? (
            <div style={{display:"flex", gap:"0.5rem", alignItems:"center"}}>
              <span className="badge">Logged in</span>
              <button onClick={()=>{localStorage.removeItem("token"); setToken("");}}>Logout</button>
            </div>
          ) : (
            <form onSubmit={login} style={{display:"flex", gap:"0.5rem"}}>
              <input placeholder="username" value={auth.username} onChange={e=>setAuth({...auth, username:e.target.value})} />
              <input type="password" placeholder="password" value={auth.password} onChange={e=>setAuth({...auth, password:e.target.value})} />
              <button>Login</button>
            </form>
          )}
        </div>
      </div>

      <div className="container" style={{display:"grid", gridTemplateColumns:"2fr 1fr", gap:"1rem"}}>
        <div className="grid" style={{alignContent:"start"}}>
          <div className="card">
            <PlantSearch onSelect={setSelected} />
          </div>
          <div className="card">
            <BlogList token={token} />
          </div>
        </div>
        <div className="grid" style={{alignContent:"start"}}>
          <div className="card">
            <PlantDetail id={selected?.id} plant={selected} />
          </div>
          <div className="card">
            <BlogEditor token={token} />
          </div>
        </div>
      </div>
    </>
  );
}