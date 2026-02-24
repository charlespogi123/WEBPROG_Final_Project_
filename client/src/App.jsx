import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';

// AVATAR TOGGLE IMAGES
import myRealPhoto from './assets/me.png';
import myRobloxPhoto from './assets/roblox.png';

// BADGE IMAGES
import badgeHonor from './assets/honorstudent.png';
import badgeSHS from './assets/shsgraduate.png';
import badgeCyber from './assets/cyber.png';
import badgeWeb from './assets/webbuilder.png';
import badgeIT from './assets/2ndyearit.png';

// BADGE IMAGES
import badgeHonor from './assets/honorstudent.png';
import badgeSHS from './assets/shsgraduate.png';
import badgeCyber from './assets/cyber.png';
import badgeWeb from './assets/webbuilder.png';
import badgeIT from './assets/2ndyearit.png';

// EDUCATION IMAGES
import edu1_1 from './assets/edu_apc1.png';
import edu1_2 from './assets/edu_apc2.png';
import edu1_3 from './assets/edu_apc3.png';
import edu1_4 from './assets/edu_apc4.png';
import edu1_5 from './assets/edu_apc5.png.png';
import edu2_1 from './assets/edu_shs1.png';
import edu2_2 from './assets/edu_shs2.png';
import edu2_3 from './assets/edu_shs3.png';
import edu2_4 from './assets/edu_shs4.png';
import edu2_5 from './assets/edu_shs5.png';
import edu2_6 from './assets/edu_shs6.png';
import edu3_1 from './assets/edu_jhs1.png';
import edu3_2 from './assets/edu_jhs2.png';
import edu3_3 from './assets/edu_jhs3.png';
import edu3_4 from './assets/edu_jhs4.png';

// IMPORT LOCAL LOGOS
import defaultBacon from './assets/bacon.png';
import defaultBaconGirl from './assets/bacongirl.png';
import defaultAvatar3 from './assets/avatar3.png';
import pythonLogo from './experiences/python.png';
import htmlLogo from './experiences/html.png';
import cssLogo from './experiences/css.png';
import jsLogo from './experiences/javascript.png';
import kaliLogo from './experiences/kali.png';
import bashLogo from './experiences/bash.png';
import reactLogo from './experiences/react.png';

// IMPORT FRIEND ASSETS
import friend1 from './assets/friends1.png';
import friend2 from './assets/friends2.png';
import friend3 from './assets/friends3.png';
import friend4 from './assets/friends4.png';
import friend5 from './assets/friends5.png';
import friend6 from './assets/friends6.png';

// NEW: IMPORT FAMILY ASSETS
import family1 from './assets/family1.png';
import family2 from './assets/family2.png';
import family3 from './assets/family3.png';

// NEW: IMPORT PET ASSETS
import pet1 from './assets/pet1.png';
import pet2 from './assets/pet2.png';
import pet3 from './assets/pet3.png';
import pet4 from './assets/pet4.png';
import pet5 from './assets/pet5.png';
import pet6 from './assets/pet6.png';

const supabase = createClient(
  'https://mfqubfjakdfsmsszaxai.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mcXViZmpha2Rmc21zc3pheGFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2NjkxODcsImV4cCI6MjA4NzI0NTE4N30.Q7VjclZFeK9kjV1qohE4iLTilOJlVS0o10b8OYqG8PM'
);

// ── BADGES DATA ──────────────────────────────────────────────
const badges = [
  {
    id: 1,
    img: badgeHonor,
    label: 'Honor Student',
    desc: 'Consistent honor student 2024–2026',
    color: 'gold',
  },
  {
    id: 2,
    img: badgeSHS,
    label: 'SHS Graduate',
    desc: 'Graduated with honors in Senior High School',
    color: 'blue',
  },
  {
    id: 3,
    img: badgeCyber,
    label: 'Cyber Learner',
    desc: 'Actively studying cybersecurity & Kali Linux',
    color: 'red',
  },
  {
    id: 5,
    img: badgeWeb,
    label: 'Web Builder',
    desc: 'Proficient in HTML, CSS & JavaScript',
    color: 'orange',
  },
  {
    id: 7,
    img: badgeIT,
    label: '2nd Year IT',
    desc: 'Asia Pacific College — BS in IT',
    color: 'purple',
  },
];

// ── EDUCATION DATA ──────────────────────────────────────────
const educationData = [
  {
    title: 'Asia Pacific College',
    subtitle: 'BS Information Technology',
    period: '2024 – Present',
    icon: '🎓',
    color: '#00a2ff',
    desc: '2nd Year IT student at APC focusing on web development and cybersecurity.',
    images: [edu1_1, edu1_2, edu1_3, edu1_4, edu1_5],
  },
  {
    title: 'SHS Graduate',
    subtitle: 'Senior High School — With Honors',
    period: '2022 – 2024',
    icon: '🏅',
    color: '#fbbf24',
    desc: 'Graduated with honors. Consistent honor student throughout Senior High School.',
    images: [edu2_1, edu2_2, edu2_3, edu2_4, edu2_5, edu2_6],
  },
  {
    title: 'Junior High School',
    subtitle: 'General Education',
    period: '2018 – 2022',
    icon: '📚',
    color: '#34d399',
    desc: 'Completed Junior High School with a strong academic foundation.',
    images: [edu3_1, edu3_2, edu3_3, edu3_4],
  },
];

function App() {
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState('');
  const [msg, setMsg] = useState('');
  const [connections, setConnections] = useState([]);
  
  const [showRoblox, setShowRoblox] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);
  const [showEduModal, setShowEduModal] = useState(false);
  const [activeEduItem, setActiveEduItem] = useState(null);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showExpModal, setShowExpModal] = useState(false); 
  const [showGalleryModal, setShowGalleryModal] = useState(false); 
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [activeBadge, setActiveBadge] = useState(null);
  
  const [activeExperience, setActiveExperience] = useState(null);
  const [activeGalleryItem, setActiveGalleryItem] = useState(null);
  const [activeItem, setActiveItem] = useState(null); 
  const [galleryIndex, setGalleryIndex] = useState(0);

  const [connName, setConnName] = useState('');
  const [connDesc, setConnDesc] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState('bacon');
  const [isUploading, setIsUploading] = useState(false);

  const defaultAvatars = {
    bacon:     defaultBacon,
    bacongirl: defaultBaconGirl,
    avatar3:   defaultAvatar3,
  };

  const educationRef = useRef(null);
  const experienceRef = useRef(null);
  const gallerySectionRef = useRef(null);

  const BACKEND_URL = 'https://potential-orbit-jj4q97qvp9ppc56p9-3000.app.github.dev';

  const nextImage = (images) => {
    setGalleryIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (images) => {
    setGalleryIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const techStack = [
    { title: 'Python', rating: 86, difficulty: 'Moderate', images: [pythonLogo], desc: 'Advanced scripting and automation.' },
    { title: 'HTML', rating: 85, difficulty: 'Easy', images: [htmlLogo], desc: 'Semantic structure and accessibility expert.' },
    { title: 'CSS', rating: 86, difficulty: 'Moderate', images: [cssLogo], desc: 'Flexbox, Grid, and complex animations.' },
    { title: 'JavaScript', rating: 80, difficulty: 'Hard', images: [jsLogo], desc: 'Core logic for interactive web applications.' },
    { title: 'Kali Linux', rating: 78, difficulty: 'Expert', images: [kaliLogo], desc: 'Security auditing and pentesting.' },
    { title: 'Bash', rating: 78, difficulty: 'Hard', images: [bashLogo], desc: 'Shell scripting and sys-admin.' },
    { title: 'React', rating: 52, difficulty: 'Hard', images: [reactLogo], desc: 'High-performance UI components.' }
  ];

  const myGallery = [
    { 
      title: 'Family', 
      difficulty: 'Family', 
      images: [family1, family2, family3], 
      desc: 'My family members who support my journey.'
    },
    { 
      title: 'Friends', 
      difficulty: 'Friends', 
      images: [friend1, friend2, friend3, friend4, friend5, friend6], 
      desc: 'The squad that keeps me sane through college.'
    },
    { 
      title: 'Pets', 
      difficulty: 'Pets', 
      images: [pet1, pet2, pet3, pet4, pet5, pet6], 
      desc: 'My loyal furry companions.'
    },
  ];

  const fetchData = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/comments`);
      if (res.ok) {
        const data = await res.json();
        setComments(data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)));
      }
      const { data: conns } = await supabase.from('connections').select('*').order('created_at', { ascending: false });
      if (conns) setConnections(conns);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleOpenEdu = (item) => {
    setActiveEduItem(item);
    setGalleryIndex(0);
    setShowEduModal(true);
  };

  const handleOpenExperience = (item) => {
    setActiveExperience(item);
    setGalleryIndex(0);
    setShowExpModal(true);
  };

  const handleOpenGallery = (item) => {
    setActiveGalleryItem(item);
    setGalleryIndex(0);
    setShowGalleryModal(true);
  };

  const handleOpenBadge = (badge) => {
    setActiveBadge(badge);
    setShowBadgeModal(true);
  };

  const handleAddConnection = async (e) => {
    e.preventDefault();
    if (!connName) return alert("Please provide a name!");
    setIsUploading(true);
    let finalImgUrl = defaultAvatars[selectedAvatar] || defaultBacon;
    try {
      if (selectedFile) {
        const fileName = `${Date.now()}-${selectedFile.name}`;
        await supabase.storage.from('avatars').upload(fileName, selectedFile);
        const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
        finalImgUrl = data.publicUrl;
      }
      await supabase.from('connections').insert([{ name: connName, description: connDesc, image_url: finalImgUrl }]);
      setConnName(''); setConnDesc(''); setSelectedFile(null); setSelectedAvatar('bacon'); setShowConnectModal(false); fetchData();
    } catch (err) { alert(err.message); } finally { setIsUploading(false); }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!user || !msg) return;
    try {
      await fetch(`${BACKEND_URL}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, content: msg })
      });
      setUser(''); setMsg(''); fetchData();
    } catch (e) { console.error(e); }
  };

  return (
    <div className="app-container" style={{width:"100%",maxWidth:"100%",overflowX:"hidden"}}>
      <div className="main-wrapper">
        <header className="navbar">
          <div className="nav-left">
            <h1 className="brand">CHARBLOX</h1>
            <span className={showRoblox ? 'status-dot online' : 'status-dot offline'}>
              ● {showRoblox ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>
          <button
            className="theme-toggle"
            onClick={() => setIsDark(prev => !prev)}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </header>

        <main className="content-area">
          {/* HERO SECTION */}
          <section className="section about-me-hero">
            <div className="hero-card">
              <div
                className={`hero-avatar-container ${showRoblox ? 'avatar-roblox' : 'avatar-real'}`}
                onClick={() => setShowRoblox(prev => !prev)}
                title={showRoblox ? 'Click to see real me' : 'Click to see Roblox avatar'}
              >
                <img
                  key={showRoblox ? 'roblox' : 'real'}
                  src={showRoblox ? myRobloxPhoto : myRealPhoto}
                  alt="Charles"
                  className="hero-pfp avatar-swap"
                />
                <div className="avatar-toggle-hint">
                  {showRoblox ? '👤' : '🎮'}
                </div>
              </div>
              <div className="hero-details">
                <h2 className="hero-title">Charles <span className="verified-tag">✔</span></h2>
                <p className="hero-subtitle">cbcapagngan2@student.apc.edu.ph • 2nd Year Student</p>
                <div className="hero-stats">
                  <div className="stat-item"><strong>{connections.length}</strong><span>Connections</span></div>
                  <div className="stat-item"><strong>{badges.length}</strong><span>Badges</span></div>
                </div>
                <p className="hero-bio">Hi! I'm Charles, a 2nd Year College student from Asia Pacific College. Exploring IT with a strong interest in cybersecurity.</p>
              </div>
            </div>
          </section>

          {/* ── BADGES SECTION ── */}
          <section className="section">
            <div className="section-head">
              <h3>Badges &amp; Achievements <span>{badges.length}</span></h3>
            </div>
            <div className="badges-row">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`badge-card badge-${badge.color}`}
                  onClick={() => handleOpenBadge(badge)}
                >
                  <div className="badge-icon-wrap">
                    <img src={badge.img} alt={badge.label} className="badge-img" />
                  </div>
                  <span className="badge-label">{badge.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* CONNECTIONS SECTION */}
          <section className="section">
            <div className="section-head">
              <h3>Connections ({connections.length}) <span>〉</span></h3>
            </div>
            <div className="scroll-row">
              <div className="friend-card" onClick={() => setShowConnectModal(true)}>
                <div className="circle-thumb plus">+</div>
                <span className="friend-name">Connect</span>
              </div>
              {connections.map(f => (
                <div key={f.id} className="friend-card" onClick={() => { setActiveItem(f); setShowDetailsModal(true); }}>
                  <div className="circle-thumb"><img src={f.image_url} alt={f.name} /></div>
                  <span className="friend-name">{f.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* EDUCATION SECTION */}
          <section className="section">
            <div className="section-head"><h3>My Education</h3></div>
            <div className="experience-box">
              <button className="scroll-btn left" onClick={() => educationRef.current?.scrollBy({ left: -450, behavior: 'smooth' })}>〈</button>
              <div className="scroll-track" ref={educationRef}>
                {educationData.map((edu, index) => (
                  <div key={index} className="tech-tile" onClick={() => handleOpenEdu(edu)}>
                    <div className="tile-top" style={{ borderColor: edu.color + '35' }}>
                      <img src={edu.images[0]} alt={edu.title} />
                    </div>
                    <div className="tile-info">
                      <div className="friend-name" style={{ textAlign: 'left' }}>{edu.title}</div>
                      <div className="tile-rating"><span className="edu-period-label" style={{ color: edu.color }}>{edu.period}</span></div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="scroll-btn right" onClick={() => educationRef.current?.scrollBy({ left: 450, behavior: 'smooth' })}>〉</button>
            </div>
          </section>

          {/* TECH EXPERIENCES SECTION */}
          <section className="section">
            <div className="section-head"><h3>My Tech Experiences</h3></div>
            <div className="experience-box">
              <button className="scroll-btn left" onClick={() => experienceRef.current?.scrollBy({ left: -450, behavior: 'smooth' })}>〈</button>
              <div className="scroll-track" ref={experienceRef}>
                {techStack.map((tech, index) => (
                  <div key={index} className="tech-tile" onClick={() => handleOpenExperience(tech)}>
                    <div className="tile-top"><img src={tech.images[0]} alt={tech.title} /></div>
                    <div className="tile-info">
                      <div className="friend-name" style={{textAlign: 'left'}}>{tech.title}</div>
                      <div className="tile-rating"><span className="rating-label">{tech.difficulty}</span></div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="scroll-btn right" onClick={() => experienceRef.current?.scrollBy({ left: 450, behavior: 'smooth' })}>〉</button>
            </div>
          </section>

          {/* MY GALLERY SECTION */}
          <section className="section">
            <div className="section-head"><h3>My Gallery</h3></div>
            <div className="experience-box">
              <button className="scroll-btn left" onClick={() => gallerySectionRef.current?.scrollBy({ left: -450, behavior: 'smooth' })}>〈</button>
              <div className="scroll-track" ref={gallerySectionRef}>
                {myGallery.map((item, index) => (
                  <div key={index} className="tech-tile" onClick={() => handleOpenGallery(item)}>
                    <div className="tile-top"><img src={item.images[0]} alt={item.title} /></div>
                    <div className="tile-info">
                      <div className="friend-name" style={{textAlign: 'left'}}>{item.title}</div>
                      <div className="tile-rating"><span className="rating-label">{item.difficulty}</span></div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="scroll-btn right" onClick={() => gallerySectionRef.current?.scrollBy({ left: 450, behavior: 'smooth' })}>〉</button>
            </div>
          </section>

          {/* GLOBAL CHAT SECTION */}
          <section className="section">
            <div className="section-head"><h3>Global Chat</h3></div>
            <div className="roblox-chat">
              <div className="chat-body" style={{flex: 1, overflowY: 'auto', padding: '15px'}}>
                {comments.map(c => (
                  <div key={c.id} className="chat-line">
                    <span className="chat-timestamp">
                      {new Date(c.created_at).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })}
                      {' · '}
                      {new Date(c.created_at).toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </span>
                    <span className="user-tag">[{c.username}]: </span>
                    <span className="text-tag">{c.content}</span>
                  </div>
                ))}
              </div>
              <form className="chat-footer" onSubmit={handlePost}>
                <input className="chat-u" type="text" placeholder="User" value={user} onChange={(e) => setUser(e.target.value)} />
                <input className="chat-m" type="text" placeholder="Say something..." value={msg} onChange={(e) => setMsg(e.target.value)} />
                <button type="submit" className="btn-save" style={{padding: '5px 15px', flex: '0 1 auto'}}>Send</button>
              </form>
            </div>
          </section>
        </main>
      </div>

      {/* ── BADGE DETAIL MODAL ── */}
      {showBadgeModal && activeBadge && (
        <div className="modal-backdrop" onClick={() => setShowBadgeModal(false)}>
          <div className="roblox-modal badge-modal" onClick={e => e.stopPropagation()}>
            <button className="close-x" onClick={() => setShowBadgeModal(false)}>✕</button>
            <div className={`badge-modal-header badge-${activeBadge.color}`}>
              <div className="badge-modal-icon">
                <img src={activeBadge.img} alt={activeBadge.label} className="badge-modal-img" />
              </div>
            </div>
            <div className="badge-modal-body">
              <h2 className="badge-modal-title">{activeBadge.label}</h2>
              <p className="badge-modal-desc">{activeBadge.desc}</p>
              <div className="badge-modal-footer">
                <span className="badge-earned-label">✔ Earned by Charles</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODALS */}
      {showConnectModal && (
        <div className="modal-backdrop" onClick={() => setShowConnectModal(false)}>
          <div className="roblox-modal connect-modal" onClick={e => e.stopPropagation()}>
            <button className="close-x" onClick={() => setShowConnectModal(false)}>✕</button>

            {/* Header */}
            <div className="connect-modal-header">
              <div className="connect-preview-avatar">
                <img
                  src={selectedFile ? URL.createObjectURL(selectedFile) : defaultAvatars[selectedAvatar]}
                  alt="preview"
                />
              </div>
              <div>
                <h2 className="connect-modal-title">New Connection</h2>
                <p className="connect-modal-sub">Add someone to your network</p>
              </div>
            </div>

            <form onSubmit={handleAddConnection} className="connect-form">

              {/* Name */}
              <div className="form-item">
                <label>Display Name</label>
                <input
                  type="text"
                  placeholder="Enter name..."
                  value={connName}
                  onChange={(e) => setConnName(e.target.value)}
                  required
                />
              </div>

              {/* Bio */}
              <div className="form-item">
                <label>Bio <span className="form-optional">optional</span></label>
                <textarea
                  placeholder="Say something about them..."
                  value={connDesc}
                  onChange={(e) => setConnDesc(e.target.value)}
                />
              </div>

              {/* Default Avatar Picker */}
              <div className="form-item">
                <label>Default Avatar</label>
                <div className="avatar-picker">
                  {[
                    { key: 'bacon',     src: defaultBacon,     label: 'Bacon' },
                    { key: 'bacongirl', src: defaultBaconGirl, label: 'Bacon Girl' },
                    { key: 'avatar3',   src: defaultAvatar3,   label: 'Avatar 3' },
                  ].map(av => (
                    <button
                      key={av.key}
                      type="button"
                      className={`avatar-pick-btn ${selectedAvatar === av.key && !selectedFile ? 'selected' : ''}`}
                      onClick={() => { setSelectedAvatar(av.key); setSelectedFile(null); }}
                    >
                      <img src={av.src} alt={av.label} />
                      <span>{av.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Upload */}
              <div className="form-item">
                <label>Custom Photo <span className="form-optional">optional — overrides above</span></label>
                <label className="file-upload-btn">
                  {selectedFile ? `✔ ${selectedFile.name}` : '📁 Choose File'}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => setSelectedFile(e.target.files[0] || null)}
                  />
                </label>
                {selectedFile && (
                  <button type="button" className="file-clear-btn" onClick={() => setSelectedFile(null)}>
                    ✕ Remove photo
                  </button>
                )}
              </div>

              <div className="modal-buttons">
                <button type="submit" className="btn-save" disabled={isUploading}>
                  {isUploading ? 'Connecting...' : '+ Connect'}
                </button>
                <button type="button" className="btn-cancel" onClick={() => setShowConnectModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDetailsModal && activeItem && (
        <div className="modal-backdrop" onClick={() => setShowDetailsModal(false)}>
          <div className="roblox-modal profile-view" onClick={e => e.stopPropagation()}>
            <button className="close-x" onClick={() => setShowDetailsModal(false)}>✕</button>
            <div className="profile-header-container">
              <img src={activeItem.image_url} alt={activeItem.name} className="profile-pfp-large" />
              <div className="profile-info-main"><h2 className="profile-name">{activeItem.name}</h2></div>
            </div>
            <div className="profile-tabs"><div className="tab active">About</div></div>
            <div className="profile-tab-content"><p className="bio-text">{activeItem.description || "No bio."}</p></div>
          </div>
        </div>
      )}

      {showExpModal && activeExperience && (
        <div className="modal-backdrop" onClick={() => setShowExpModal(false)}>
          <div className="roblox-modal exp-detail-view" onClick={e => e.stopPropagation()}>
            <button className="close-x" onClick={() => setShowExpModal(false)}>✕</button>
            <div className="exp-header-top">
              <div className="exp-header-left">
                <img src={activeExperience.images[0]} alt="thumb" className="exp-thumb-small" />
                <div className="exp-title-container">
                  <h2 className="exp-title">{activeExperience.title}</h2>
                  <div className="exp-maturity">{activeExperience.difficulty}</div>
                </div>
              </div>
            </div>
            <div className="exp-gallery-wrapper">
              <div className="gallery-display">
                {activeExperience.images.length > 1 && (
                  <button className="gallery-nav-btn left" onClick={() => prevImage(activeExperience.images)}>〈</button>
                )}
                <img src={activeExperience.images[galleryIndex]} alt="Showcase" className="full-view-img" />
                {activeExperience.images.length > 1 && (
                  <button className="gallery-nav-btn right" onClick={() => nextImage(activeExperience.images)}>〉</button>
                )}
              </div>
            </div>
            <div className="profile-tabs"><div className="tab active">About</div></div>
            <div className="exp-description-section" style={{padding: '20px'}}>
              <h3 className="desc-label">Description</h3>
              <p className="desc-text">{activeExperience.desc}</p>
              <div className="proficiency-tag">Skill Rating: {activeExperience.rating}%</div>
            </div>
          </div>
        </div>
      )}

      {/* ── EDUCATION MODAL ── */}
      {showEduModal && activeEduItem && (
        <div className="modal-backdrop" onClick={() => setShowEduModal(false)}>
          <div className="roblox-modal exp-detail-view gallery-modal" onClick={e => e.stopPropagation()}>
            <button className="close-x" onClick={() => setShowEduModal(false)}>✕</button>
            <div className="exp-header-top">
              <div className="exp-header-left">
                <div className="edu-modal-thumb" style={{ background: activeEduItem.color + '18', borderColor: activeEduItem.color + '40' }}>
                  <span style={{ fontSize: '22px' }}>{activeEduItem.icon}</span>
                </div>
                <div className="exp-title-container">
                  <h2 className="exp-title">{activeEduItem.title}</h2>
                  <div className="exp-maturity" style={{ color: activeEduItem.color }}>{activeEduItem.period} · {activeEduItem.subtitle}</div>
                </div>
              </div>
            </div>
            <div className="exp-gallery-wrapper" style={{ position: 'relative', background: '#0a0a0b' }}>
              <div className="gallery-display" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '260px' }}>
                {activeEduItem.images.length > 1 && (
                  <>
                    <button className="gallery-nav-btn left" style={{ zIndex: 1000, position: 'absolute', left: '10px' }} onClick={(e) => { e.stopPropagation(); prevImage(activeEduItem.images); }}>〈</button>
                    <button className="gallery-nav-btn right" style={{ zIndex: 1000, position: 'absolute', right: '10px' }} onClick={(e) => { e.stopPropagation(); nextImage(activeEduItem.images); }}>〉</button>
                  </>
                )}
                <img key={galleryIndex} src={activeEduItem.images[galleryIndex]} alt={`${activeEduItem.title} ${galleryIndex}`} className="full-view-img" style={{ maxWidth: '100%', maxHeight: '420px', objectFit: 'contain' }} />
              </div>
            </div>
            <div className="profile-tabs"><div className="tab active">About</div></div>
            <div className="exp-description-section" style={{ padding: '20px' }}>
              <h3 className="desc-label">About this School</h3>
              <p className="desc-text">{activeEduItem.desc}</p>
              <p style={{ fontSize: '12px', color: 'var(--text-4)', marginTop: '10px' }}>Photo {galleryIndex + 1} of {activeEduItem.images.length}</p>
            </div>
          </div>
        </div>
      )}

      {showGalleryModal && activeGalleryItem && (
        <div className="modal-backdrop" onClick={() => setShowGalleryModal(false)}>
          <div className="roblox-modal exp-detail-view gallery-modal" onClick={e => e.stopPropagation()}>
            <button className="close-x" onClick={() => setShowGalleryModal(false)}>✕</button>
            <div className="exp-header-top">
              <div className="exp-header-left">
                <img src={activeGalleryItem.images[0]} alt="thumb" className="exp-thumb-small" style={{borderRadius: '50%'}} />
                <div className="exp-title-container">
                  <h2 className="exp-title">{activeGalleryItem.title}</h2>
                  <div className="exp-maturity">Category: {activeGalleryItem.difficulty}</div>
                </div>
              </div>
            </div>
            <div className="exp-gallery-wrapper" style={{ position: 'relative', background: '#000' }}>
              <div className="gallery-display" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                {activeGalleryItem.images.length > 1 && (
                  <>
                    <button className="gallery-nav-btn left" style={{ zIndex: 1000, position: 'absolute', left: '10px' }} onClick={(e) => { e.stopPropagation(); prevImage(activeGalleryItem.images); }}>〈</button>
                    <button className="gallery-nav-btn right" style={{ zIndex: 1000, position: 'absolute', right: '10px' }} onClick={(e) => { e.stopPropagation(); nextImage(activeGalleryItem.images); }}>〉</button>
                  </>
                )}
                <img key={galleryIndex} src={activeGalleryItem.images[galleryIndex]} alt={`Showcase ${galleryIndex}`} className="full-view-img" style={{ maxWidth: '100%', maxHeight: '450px', objectFit: 'contain' }} />
              </div>
            </div>
            <div className="profile-tabs"><div className="tab active">Collection</div></div>
            <div className="exp-description-section" style={{padding: '20px'}}>
              <h3 className="desc-label">Personal Note</h3>
              <p className="desc-text">{activeGalleryItem.desc}</p>
              <p style={{fontSize: '12px', color: '#ccc', marginTop: '10px'}}>Image {galleryIndex + 1} of {activeGalleryItem.images.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;