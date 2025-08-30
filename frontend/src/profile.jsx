import { useState, useEffect } from "react";

const API = "http://localhost:5000";
 // replace with deployed backend

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API}/profile`);
      const data = await res.json();
      setProfile(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>My Profile</h2>
      <p><b>Name:</b> {profile.name}</p>
      <p><b>Email:</b> {profile.email}</p>
      <p><b>Education:</b> {profile.education}</p>

      <h3>Skills</h3>
      {profile.skills && profile.skills.length > 0 ? (
        <ul>
          {profile.skills.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      ) : (
        <p>No skills listed.</p>
      )}

      <h3>Projects</h3>
      {profile.projects && profile.projects.length > 0 ? (
        <ul>
          {profile.projects.map((p, i) => (
            <li key={i}>
              <b>{p.title}</b> - {p.description} <br />
              {p.links &&
                p.links.map((l, j) => (
                  <a key={j} href={l} target="_blank" rel="noreferrer">
                    Link {j + 1}
                  </a>
                ))}
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects listed.</p>
      )}

      <h3>Work Experience</h3>
      {profile.work && profile.work.length > 0 ? (
        <ul>
          {profile.work.map((w, i) => (
            <li key={i}>
              <b>{w.role}</b> at {w.company} ({w.duration})
            </li>
          ))}
        </ul>
      ) : (
        <p>No work experience.</p>
      )}

      <h3>Links</h3>
      {profile.links ? (
        <ul>
          <li>
            <a href={profile.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
        </ul>
      ) : (
        <p>No links available.</p>
      )}
    </div>
  );
}

export default Profile;
