import { useState } from "react";
import Profile from "./profile";

const API = "https://me-api-playground-8.onrender.com";
 // replace with deployed backend

function App() {
  const [page, setPage] = useState("home"); // "home" or "profile"
  const [skill, setSkill] = useState("");
  const [projects, setProjects] = useState([]);

  const searchProjects = async () => {
    try {
      const res = await fetch(`${API}/projects?skill=${skill}`);
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Me-API Playground</h1>

      {/* 🔹 Navigation */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setPage("home")}
          style={{ marginRight: "10px", fontWeight: page === "home" ? "bold" : "normal" }}
        >
          Home
        </button>
        <button
          onClick={() => setPage("profile")}
          style={{ fontWeight: page === "profile" ? "bold" : "normal" }}
        >
          Profile
        </button>
      </div>

      {/* 🔹 Home Page */}
      {page === "home" && (
        <div>
          <h2>Search Projects</h2>
          <input
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          placeholder="Enter a skill (e.g. React, Python)"
         style={{ marginRight: "10px" }}
         />

          <button onClick={searchProjects}>Search</button>

          <h3 style={{ marginTop: "20px" }}>Projects</h3>
          {projects.length > 0 ? (
            <ul>
              {projects.map((p, i) => (
                <li key={i}>
                  <b>{p.title}</b> - {p.description} <br />
                  <a href={p.link} target="_blank" rel="noreferrer">
                    View
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No projects found. Try searching by a skill.</p>
          )}
        </div>
      )}

      {/* 🔹 Profile Page */}
      {page === "profile" && <Profile />}
    </div>
  );
}

export default App;
