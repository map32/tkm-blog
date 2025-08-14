import React, { useState } from "react";
import Tabs from "./components/Tabs.jsx";
import PlantSearch from "./components/PlantSearch.jsx";
import PlantDetail from "./components/PlantDetail.jsx";
import BlogList from "./components/BlogList.jsx";
import BlogEditor from "./components/BlogEditor.jsx";
import KtmSection from "./components/KtmSection.jsx";

const api = (path) => (window.location.origin.includes(":8080") ? "http://localhost:8080" : "") + path;

export default function App() {
  const [selected, setSelected] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [auth, setAuth] = useState({ username: "", password: "" });
  const [activeTab, setActiveTab] = useState("plants");

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

  const tabs = [
    { key: "plants", label: "Plant Search" },
    { key: "blog", label: "Blog Editor" },
    { key: "ktm", label: "KTM Pages" }
  ];

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

      <div className="container" style={{display:"grid", gap:"1rem"}}>
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

        {activeTab === "plants" && (
          <div style={{display:"grid", gridTemplateColumns:"2fr 1fr", gap:"1rem"}}>
            <div className="card">
              <PlantSearch onSelect={setSelected} />
            </div>
            <div className="card">
              <PlantDetail id={selected?.id} plant={selected} />
            </div>
          </div>
        )}

        {activeTab === "blog" && (
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem"}}>
            <div className="card">
              <BlogEditor token={token} />
            </div>
            <div className="card">
              <BlogList />
            </div>
          </div>
        )}

        {activeTab === "ktm" && (
          <div className="card">
            <KtmSection />
          </div>
        )}
      </div>
    </>
  );
}