-- Profile Table
CREATE TABLE profile (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  education TEXT,
  phone TEXT,
  cgpa NUMERIC(3,2)  -- allows values like 7.5, 8.75 etc.
);

-- Skills Table
CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  profile_id INT REFERENCES profile(id) ON DELETE CASCADE,
  skill TEXT NOT NULL
);

-- Projects Table
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  profile_id INT REFERENCES profile(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  skills TEXT[],   -- array of technologies
  link TEXT
);

-- Work Experience Table
CREATE TABLE work (
  id SERIAL PRIMARY KEY,
  profile_id INT REFERENCES profile(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  duration TEXT,
  details TEXT
);

-- Links Table
CREATE TABLE links (
  id SERIAL PRIMARY KEY,
  profile_id INT REFERENCES profile(id) ON DELETE CASCADE,
  github TEXT,
  linkedin TEXT
  -- removed portfolio since not in seed.sql
);

-- Achievements Table
CREATE TABLE achievements (
  id SERIAL PRIMARY KEY,
  profile_id INT REFERENCES profile(id) ON DELETE CASCADE,
  achievement TEXT NOT NULL
);

-- Certifications Table
CREATE TABLE certifications (
  id SERIAL PRIMARY KEY,
  profile_id INT REFERENCES profile(id) ON DELETE CASCADE,
  certification TEXT NOT NULL
);
