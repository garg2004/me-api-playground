import express from "express";
import pool from "./db.js";

const router = express.Router();

// Health
router.get("/health", (req, res) => res.json({ status: "ok" }));

// Profile (enhanced with related data)
router.get("/profile", async (req, res) => {
  try {
    const { rows: profileRows } = await pool.query("SELECT * FROM profile LIMIT 1");
    if (profileRows.length === 0) return res.json({});

    const profile = profileRows[0];

    // Fetch related data
    const { rows: skills } = await pool.query(
      "SELECT skill FROM skills WHERE profile_id=$1",
      [profile.id]
    );

    const { rows: projects } = await pool.query(
      "SELECT title, description, link FROM projects WHERE profile_id=$1",
      [profile.id]
    );

    const { rows: work } = await pool.query(
      "SELECT role, company, duration FROM work WHERE profile_id=$1",
      [profile.id]
    );

    const { rows: links } = await pool.query(
      "SELECT github, linkedin FROM links WHERE profile_id=$1",
      [profile.id]
    );

    // Send combined JSON
    res.json({
      ...profile,
      skills: skills.map(s => s.skill),
      projects,
      work,
      links: links[0] || {}
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});



// Return all skills for profile 1 (sorted)
router.get("/skills/top", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT skill FROM skills WHERE profile_id=1 ORDER BY skill ASC"
    );
    res.json(rows.map(r => r.skill));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/search", async (req, res) => {
  try {
    const q = `%${req.query.q}%`;

    // Search projects
    const { rows: projects } = await pool.query(
      "SELECT 'project' AS type, title AS name, description, link FROM projects WHERE title ILIKE $1 OR description ILIKE $1",
      [q]
    );

    // Search skills
    const { rows: skills } = await pool.query(
      "SELECT 'skill' AS type, skill AS name FROM skills WHERE skill ILIKE $1",
      [q]
    );

    // Search work
    const { rows: work } = await pool.query(
      "SELECT 'work' AS type, role AS name, company, duration FROM work WHERE role ILIKE $1 OR company ILIKE $1",
      [q]
    );
    
    // Search profile
    const { rows: profile } = await pool.query(
      "SELECT 'profile' AS type, name, email, education FROM profile WHERE name ILIKE $1 OR email ILIKE $1 OR education ILIKE $1",
      [q]
    );

    const results = [...projects, ...skills, ...work, ...profile];
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
// Projects filtered by skill (case-insensitive, partial match)
router.get("/projects", async (req, res) => {
  try {
    const skill = req.query.skill;
    if (!skill) {
      return res.json([]);
    }

    const { rows } = await pool.query(
      `SELECT * FROM projects 
       WHERE EXISTS (
         SELECT 1 FROM unnest(skills) s WHERE s ILIKE $1
       )`,
      [`%${skill}%`]
    );

    res.json(rows);
  } catch (err) {
    console.error("❌ Error in /projects:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
