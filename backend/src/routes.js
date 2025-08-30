import express from "express";
import pool from "./db.js";

const router = express.Router();

/**
 * Health Check
 */
router.get("/health", (req, res) => res.json({ status: "ok" }));

/**
 * Root Welcome Route
 */
router.get("/", (req, res) => {
  res.send("✅ Me-API Playground backend is running! Try /health or /profile");
});

/**
 * Profile (with related data)
 */
router.get("/profile", async (req, res) => {
  try {
    const { rows: profileRows } = await pool.query("SELECT * FROM profile LIMIT 1");
    if (profileRows.length === 0) return res.json({});

    const profile = profileRows[0];

    // Fetch related data
    const { rows: skills } = await pool.query(
      "SELECT skill FROM skills WHERE profile_id=$1 ORDER BY skill ASC",
      [profile.id]
    );

    const { rows: projects } = await pool.query(
      "SELECT id, title, description, link FROM projects WHERE profile_id=$1",
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

    res.json({
      ...profile,
      skills: skills.map(s => s.skill),
      projects,
      work,
      links: links[0] || {}
    });
  } catch (err) {
    console.error("❌ Error in /profile:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * Top Skills
 */
router.get("/skills/top", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT skill FROM skills WHERE profile_id=1 ORDER BY skill ASC"
    );
    res.json(rows.map(r => r.skill));
  } catch (err) {
    console.error("❌ Error in /skills/top:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * Search across projects, skills, work, and profile
 */
router.get("/search", async (req, res) => {
  try {
    const q = `%${req.query.q}%`;

    const { rows: projects } = await pool.query(
      "SELECT 'project' AS type, title AS name, description, link FROM projects WHERE title ILIKE $1 OR description ILIKE $1",
      [q]
    );

    const { rows: skills } = await pool.query(
      "SELECT 'skill' AS type, skill AS name FROM skills WHERE skill ILIKE $1",
      [q]
    );

    const { rows: work } = await pool.query(
      "SELECT 'work' AS type, role AS name, company, duration FROM work WHERE role ILIKE $1 OR company ILIKE $1",
      [q]
    );

    const { rows: profile } = await pool.query(
      "SELECT 'profile' AS type, name, email, education FROM profile WHERE name ILIKE $1 OR email ILIKE $1 OR education ILIKE $1",
      [q]
    );

    const results = [...projects, ...skills, ...work, ...profile];
    res.json(results);
  } catch (err) {
    console.error("❌ Error in /search:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * Projects filtered by skill
 */
router.get("/projects", async (req, res) => {
  try {
    const skill = req.query.skill;
    if (!skill) return res.json([]);

    const { rows } = await pool.query(
      `SELECT p.id, p.title, p.description, p.link
       FROM projects p
       JOIN skills s ON p.profile_id = s.profile_id
       WHERE s.skill ILIKE $1`,
      [`%${skill}%`]
    );

    res.json(rows);
  } catch (err) {
    console.error("❌ Error in /projects:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
