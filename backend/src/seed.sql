-- Insert profile details
INSERT INTO profile (name, email, education, phone, cgpa)
VALUES (
  'Arpita Garg',
  'gargarpita59@gmail.com',
  'B.Tech in Computer Science Engineering, Manipal University Jaipur (2022–2026)',
  '+91-7983182007',
  '7.5'
);

-- Insert skills
INSERT INTO skills (profile_id, skill) VALUES
(1, 'C'),
(1, 'Python'),
(1, 'Java'),
(1, 'SQL'),
(1, 'JavaScript'),
(1, 'React'),
(1, 'Node'),
(1, 'Express'),
(1, 'Django'),
(1, 'Tailwind CSS'),
(1, 'Material UI'),
(1, 'OpenAI API'),
(1, 'ollama'),
(1, 'PostgreSQL'),
(1, 'MongoDB'),
(1, 'Git'),
(1, 'GitHub'),
(1, 'VS Code'),
(1, 'Figma'),
(1, 'Render'),
(1, 'Netlify'),
(1, 'Postman'),
(1, 'DSA'),
(1, 'OOP'),
(1, 'REST APIs'),
(1, 'Prompt Engineering');

-- Insert projects
INSERT INTO projects (profile_id, title, description, skills, link) VALUES
(1, 'Career Recommendation Web App',
   'Career guidance platform with Colleges & Exams Explorer and personalized Roadmap Generator. Added week-wise progress tracking with badges and milestones.',
   ARRAY['Node.js', 'PostgreSQL', 'React'],
   NULL
),
(1, 'Pern-Store',
   'Full-stack app with Node, Express, PostgreSQL, Tailwind CSS, React-UI. Supports 50+ product listings with JWT auth, cart management, and optimized SEO.',
   ARRAY['Node', 'Express', 'PostgreSQL', 'Tailwind CSS', 'React'],
   'https://pern-store.netlify.app/'
),
(1, 'Smart Resume Builder',
   'AI-powered resume builder with real-time suggestions, TinyLlama via Ollama, MongoDB for storage, PDF export, and reduced resume generation latency by 30%.',
   ARRAY['React', 'Vite', 'Tailwind CSS', 'Express.js', 'Node.js', 'MongoDB'],
   'https://smart-resume1.netlify.app/');

-- Insert work experience
INSERT INTO work (profile_id, role, company, duration, details) VALUES
(1, 'Web Developer Intern', 'Elevate Labs (Remote)', 'Jun 2025 – Jul 2025',
   'Built AI-assisted Smart Resume Builder with React, Tailwind, Node, Express, MongoDB, and OpenAI API. Deployed on Vercel and Render.'
),
(1, 'Head of Design', 'ACM-W, MUJ', 'Aug 2023 – May 2024',
   'Led design for UI/UX, branding, and event websites. Increased engagement by 30%. Core Committee for cultural fest “Elicit”.');

-- Insert links
INSERT INTO links (profile_id, github, linkedin) VALUES
(1, 'https://github.com/garg2004',
   'https://www.linkedin.com/in/arpita-garg-9b3673247/');

-- Insert achievements
INSERT INTO achievements (profile_id, achievement) VALUES
(1, 'Selected for Deloitte US Capstone Program: Developed Career Recommendation Web App using React, Python, PostgreSQL, Django Rest Framework, and AI-powered chatbot.');

-- Insert certifications
INSERT INTO certifications (profile_id, certification) VALUES
(1, 'CCNAv7: Introduction to Networks'),
(1, 'CCNAv7: Switching, Routing and Wireless Essentials'),
(1, 'Coursera: Ordered Data Structures'),
(1, 'Udemy: Design and Analysis of Algorithm');
