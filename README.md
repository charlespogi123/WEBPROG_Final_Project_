CHARBLOX — Personal Portfolio
A Roblox-inspired personal portfolio built with React + Vite
2nd Year IT Student · Asia Pacific College · Aspiring Cybersecurity Professional
Live Demo · Contact

Overview
A dark-themed, Roblox-style portfolio featuring animated UI, real-time global chat, photo galleries, badge system, and live connections — all in a single-page React application.

Features
Hero Section

Toggle between real photo and Roblox avatar with a smooth flip animation
Dynamic ONLINE / OFFLINE status indicator in the navbar — green when Roblox mode, red when real photo
Dark / Light mode toggle with smooth theme transitions across the entire UI

Badges & Achievements

5 custom Roblox-style badges with colored gradient icon backgrounds
Click any badge to open a detail modal with description and animated pop-in
Badges: Honor Student, SHS Graduate, Cyber Learner, Web Builder, 2nd Year IT

Connections

Live connections fetched from Supabase in real time
Add a connection with name, bio, and avatar
Choose from 3 default avatars (Bacon, Bacon Girl, Avatar 3) or upload a custom photo
Live avatar preview updates as you select

Education

Scrollable tile gallery for each school level
Click any tile to open a photo gallery modal with navigation arrows
Schools: Asia Pacific College, Senior High School, Junior High School

Tech Experiences

Scrollable cards for each technology: Python, HTML, CSS, JavaScript, Kali Linux, Bash, React
Each card opens a modal showing skill rating, difficulty level, and description

Gallery

Three categories: Family, Friends, Pets
Each opens a full modal gallery with image navigation

Global Chat

Real-time chat powered by a Node.js backend
Messages display with timestamp, username, and content
Animated message entry on each new post


Tech Stack
LayerTechnologyFrontendReact 18 + ViteStylingPure CSS (no frameworks) with CSS VariablesDatabaseSupabase (PostgreSQL)StorageSupabase Storage (avatar uploads)BackendNode.js (Express)DeploymentVercelFontsGoogle Fonts — Nunito & Nunito Sans

Project Structure
src/
├── assets/
│   ├── me.png                  -- Real photo
│   ├── roblox.png              -- Roblox avatar
│   ├── bacon.png               -- Default avatar
│   ├── bacongirl.png           -- Default avatar
│   ├── avatar3.png             -- Default avatar
│   ├── honorstudent.png        -- Badge image
│   ├── shsgraduate.png         -- Badge image
│   ├── cyber.png               -- Badge image
│   ├── webbuilder.png          -- Badge image
│   ├── 2ndyearit.png           -- Badge image
│   ├── edu_apc1-5.png          -- APC photos
│   ├── edu_shs1-6.png          -- SHS photos
│   ├── edu_jhs1-4.png          -- JHS photos
│   ├── family1-3.png           -- Family gallery
│   ├── friends1-6.png          -- Friends gallery
│   └── pet1-6.png              -- Pets gallery
├── experiences/
│   ├── python.png
│   ├── html.png
│   ├── css.png
│   ├── javascript.png
│   ├── kali.png
│   ├── bash.png
│   └── react.png
├── App.jsx                     -- Main component
├── App.css                     -- All styles
└── main.jsx

Getting Started
Prerequisites

Node.js 18+
npm or yarn
A Supabase account

Installation
bash# Clone the repository
git clone https://github.com/YOUR_USERNAME/charblox-portfolio.git

# Navigate into the project
cd charblox-portfolio

# Install dependencies
npm install

# Start the dev server
npm run dev
Environment Setup
This project uses Supabase directly in the client with a public anon key. Update the credentials in App.jsx if you fork this project:
jsconst supabase = createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SUPABASE_ANON_KEY'
);
Supabase Tables
connections table:
sqlcreate table connections (
  id          uuid default gen_random_uuid() primary key,
  name        text not null,
  description text,
  image_url   text,
  created_at  timestamp with time zone default now()
);
comments table:
sqlcreate table comments (
  id         uuid default gen_random_uuid() primary key,
  username   text not null,
  content    text not null,
  created_at timestamp with time zone default now()
);

Design System
The UI uses a custom CSS variable system with full dark/light mode support:
css/* Dark Mode (default) */
--bg:          #111214;
--surface:     #1c1e22;
--green:       #00b06f;    /* CTA buttons, online status */
--roblox-blue: #00a2ff;    /* Accents, borders, links */
--text:        #f0f2f5;

/* Light Mode */
--bg:      #f0f2f5;
--surface: #ffffff;
--text:    #0d0f12;
Animations

Animated background grid (gridDrift)
Ambient glow orbs on body (orbFloat)
Hero card shimmer sweep (heroShimmer)
Avatar flip transition (avatarFlip)
Tile staggered reveal (tileReveal)
Badge pop modal animation (badgePop)


Build & Deploy
bash# Build for production
npm run build

# Preview production build locally
npm run preview
The project is deployed on Vercel. To deploy your own fork, connect the repository to your Vercel account and it will build automatically on every push.

Roadmap

 Move global chat fully to Supabase to remove the Node.js backend dependency
 Add more badges as achievements unlock
 Add skill progress bars with animations
 Mobile swipe gestures for gallery modals


About
Charles — 2nd Year BS Information Technology student at Asia Pacific College, Manila.

Strong interest in Cybersecurity and ethical hacking
Building projects with React, Python, and Kali Linux
Roblox enthusiast (hence the theme)
cbcapagngan2@student.apc.edu.ph


License
This project is open source and available under the MIT License.
