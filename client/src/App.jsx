import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';

// Initialize Supabase Client
const supabase = createClient(
  'https://mfqubfjakdfsmsszaxai.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mcXViZmpha2Rmc21zc3pheGFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2NjkxODcsImV4cCI6MjA4NzI0NTE4N30.Q7VjclZFeK9kjV1qohE4iLTilOJlVS0o10b8OYqG8PM'
);

function App() {
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState('');
  const [msg, setMsg] = useState('');
  const [connections, setConnections] = useState([]);
  const [experiences, setExperiences] = useState([]);

  // Modal & Selection States
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [activeItem, setActiveItem] = useState(null); // Can be a profile or an experience
  const [viewType, setViewType] = useState(''); // 'profile' or 'experience'

  // Form States
  const [newFriendName, setNewFriendName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const fetchData = async () => {
    try {
      // 1. Fetch NestJS Chat
      const res = await fetch(`${BACKEND_URL}/comments`);
      if (res.ok) setComments(await res.json());

      // 2. Fetch Supabase Connections
      const { data: conns } = await supabase.from('connections').select('*').order('created_at', { ascending: false });
      if (conns) setConnections(conns);

      // 3. Fetch Supabase Experiences
      const { data: exps } = await supabase.from('experiences').select('*').order('created_at', { ascending: true });
      if (exps) setExperiences(exps);
    } catch (e) { console.error("Data fetch error:", e); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleConnect = async (e) => {
    e.preventDefault();
    if (!newFriendName) return alert("Name is required!");
    setIsUploading(true);

    let finalImgUrl = 'https://tr.rbxcdn.com/30day-avatarheadshot/150/150/AvatarHeadshot/Png';

    try {
      if (selectedFile) {
        const fileName = `${Date.now()}-${selectedFile.name}`;
        const { error: upErr } = await supabase.storage.from('avatars').upload(fileName, selectedFile);
        if (upErr) throw upErr;
        const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
        finalImgUrl = data.publicUrl;
      }

      await supabase.from('connections').insert([{ 
        name: newFriendName, 
        image_url: finalImgUrl, 
        description: newDescription 
      }]);

      setNewFriendName(''); setNewDescription(''); setSelectedFile(null);
      setShowConnectModal(false);
      fetchData();
    } catch (err) { alert(err.message); } finally { setIsUploading(false); }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!user || !msg) return alert("Fill in both fields!");
    try {
      await fetch(`${BACKEND_URL}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, content: msg }),
      });
      setUser(''); setMsg('');
      fetchData();
    } catch (e) { console.error(e); }
  };

  const openDetails = (item, type) => {
    setActiveItem(item);
    setViewType(type);
    setShowDetailsModal(true);
  };

  return (
    <div className="charblox-container">
      {/* MODAL: CONNECT (ADD FRIEND) */}
      {showConnectModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Connect with Charles</h3>
            <form onSubmit={handleConnect}>
              <label>Your Name</label>
              <input type="text" placeholder="Username..." value={newFriendName} onChange={(e) => setNewFriendName(e.target.value)} required />
              <label>About You</label>
              <textarea className="modal-textarea" placeholder="Tell us about yourself..." value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
              <label>Profile Photo</label>
              <input type="file" accept="image/*" className="file-input" onChange={(e) => setSelectedFile(e.target.files[0])} />
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowConnectModal(false)}>Cancel</button>
                <button type="submit" className="save-btn" disabled={isUploading}>{isUploading ? 'Connecting...' : 'Connect!'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VIEW DETAILS (PROFILE OR EXPERIENCE) */}
      {showDetailsModal && activeItem && (
        <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
          <div className="modal-content detail-card" onClick={e => e.stopPropagation()}>
            {viewType === 'experience' ? (
              <>
                <img src={activeItem.image_url} className="detail-banner" alt={activeItem.title} />
                <div className="detail-padding">
                   <h2>{activeItem.title}</h2>
                   <div className="detail-stats">👍 {activeItem.rating}% | 👥 {activeItem.playing} Playing</div>
                   <p className="description-text">{activeItem.description}</p>
                   <button className="save-btn full-width">Play</button>
                </div>
              </>
            ) : (
              <div className="detail-padding">
                <div className="profile-avatar-large"><img src={activeItem.image_url} alt={activeItem.name} /></div>
                <h2>{activeItem.name}</h2>
                <label>Description</label>
                <p className="description-text">{activeItem.description || "No description provided."}</p>
              </div>
            )}
            <div className="detail-padding">
              <button className="cancel-btn full-width" onClick={() => setShowDetailsModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* NAVIGATION */}
      <header className="charblox-nav">
        <div className="nav-left"><h1 className="logo">CHARBLOX</h1></div>
        <div className="nav-search-container"><input type="text" placeholder="Search Experiences" className="nav-search-input" /></div>
        <div className="nav-right"><span className="robux-count">⏣ 1M+</span><div className="user-settings">⚙️</div></div>
      </header>

      <main className="main-content">
        <section className="charblox-hero">
          <div className="avatar-circle"><img src="https://tr.rbxcdn.com/30day-avatarheadshot/150/150/AvatarHeadshot/Png" alt="Charles" /></div>
          <h2>Hello, <span className="username">Charles</span>!</h2>
        </section>

        {/* CONNECTIONS SECTION */}
        <section className="charblox-section">
          <div className="section-header"><h3>Connections ({connections.length})</h3><span className="see-all">See All →</span></div>
          <div className="horizontal-scroll">
            <div className="friend-item connect-trigger" onClick={() => setShowConnectModal(true)}>
              <div className="friend-img-placeholder connect-plus">+</div>
              <span className="friend-name">Connect!</span>
            </div>
            {connections.map(f => (
              <div key={f.id} className="friend-item" onClick={() => openDetails(f, 'profile')}>
                <div className="friend-img-placeholder"><img src={f.image_url} className="friend-avatar-img" alt={f.name} /></div>
                <span className="friend-name">{f.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* MY EXPERIENCES SECTION */}
        <section className="charblox-section">
          <div className="section-header"><h3>My Experiences</h3><span className="see-all">See All →</span></div>
          <div className="horizontal-scroll">
            {experiences.map(exp => (
              <div key={exp.id} className="exp-card-v2" onClick={() => openDetails(exp, 'experience')}>
                <div className="exp-thumb"><img src={exp.image_url} alt={exp.title} /></div>
                <div className="exp-info-v2">
                  <span className="exp-title-v2">{exp.title}</span>
                  <span className="exp-rating-v2">👍 {exp.rating}%</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GLOBAL CHAT */}
        <section className="charblox-section">
          <h3>Global Chat</h3>
          <div className="chat-box">
            <div className="chat-history">
              {comments.map((c) => (
                <div key={c.id} className="chat-line">
                  <span className="chat-author">[{c.username}]:</span>
                  <span className="chat-content">{c.content}</span>
                </div>
              ))}
            </div>
            <form className="chat-controls" onSubmit={handlePost}>
              <input type="text" placeholder="Name" className="chat-user-input" value={user} onChange={(e) => setUser(e.target.value)} />
              <div className="chat-input-wrapper">
                <input type="text" placeholder="Say something..." value={msg} onChange={(e) => setMsg(e.target.value)} />
                <button type="submit">SEND</button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;