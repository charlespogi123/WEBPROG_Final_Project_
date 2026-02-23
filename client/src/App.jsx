import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';

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
  
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  // Connection Form States
  const [connName, setConnName] = useState('');
  const [connDesc, setConnDesc] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const BACKEND_URL = 'https://potential-orbit-jj4q97qvp9ppc56p9-3000.app.github.dev';

  const fetchData = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/comments`);
      if (res.ok) setComments(await res.json());
      
      const { data: conns } = await supabase.from('connections').select('*').order('created_at', { ascending: false });
      if (conns) setConnections(conns);
      
      const { data: exps } = await supabase.from('experiences').select('*').order('created_at', { ascending: true });
      if (exps) setExperiences(exps);
    } catch (e) { console.error("Fetch error:", e); }
  };

  useEffect(() => {
    fetchData();
    const timer = setInterval(fetchData, 10000);
    return () => clearInterval(timer);
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!user || !msg) return alert('Fill in both fields!');
    try {
      const response = await fetch(`${BACKEND_URL}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, content: msg })
      });
      if (response.ok) { setUser(''); setMsg(''); fetchData(); }
    } catch (e) { console.error(e); }
  };

  const handleAddConnection = async (e) => {
    e.preventDefault();
    if (!connName) return alert("Please provide a name!");
    setIsUploading(true);

    let finalImgUrl = 'https://tr.rbxcdn.com/30day-avatarheadshot/150/150/AvatarHeadshot/Png';

    try {
      if (selectedFile) {
        const fileName = `${Date.now()}-${selectedFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, selectedFile);
        
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
        finalImgUrl = data.publicUrl;
      }

      const { error } = await supabase
        .from('connections')
        .insert([{ name: connName, description: connDesc, image_url: finalImgUrl }]);

      if (error) throw error;

      setConnName('');
      setConnDesc('');
      setSelectedFile(null);
      setShowConnectModal(false);
      fetchData();
    } catch (err) {
      alert(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const openDetails = (item) => {
    setActiveItem(item);
    setShowDetailsModal(true);
  };

  return (
    <div className="app-wrapper">
      <header className="navbar">
        <div className="nav-inner">
          <h1 className="brand">CHARBLOX</h1>
          <div className="search-bar"><input type="text" placeholder="Search experiences..." /></div>
          <div className="nav-icons"><span>⏣ 1M+</span><span>⚙️</span></div>
        </div>
      </header>

      <main className="main-content">
        <div className="content-inner">
          <section className="hero">
            <img src="https://tr.rbxcdn.com/30day-avatarheadshot/150/150/AvatarHeadshot/Png" alt="Charles" />
            <h2>Hello, <span>Charles</span>!</h2>
          </section>

          {/* CONNECTIONS SECTION */}
          <section className="section">
            <div className="section-head">
              <h3>Connections ({connections.length})</h3>
              <span className="see-all">See All →</span>
            </div>
            <div className="scroll-row">
              <div className="friend-card" onClick={() => setShowConnectModal(true)}>
                <div className="circle-thumb plus">+</div>
                <span>Connect</span>
              </div>
              
              {connections.map(f => (
                <div key={f.id} className="friend-card" onClick={() => openDetails(f)}>
                  <div className="circle-thumb">
                    <img src={f.image_url} alt={f.name} onError={(e) => e.target.src = 'https://via.placeholder.com/150'} />
                  </div>
                  <span>{f.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* EXPERIENCES SECTION */}
          <section className="section">
            <div className="section-head">
              <h3>My Experiences</h3>
              <span className="see-all">See All →</span>
            </div>
            <div className="experience-grid">
              {experiences.map(exp => (
                <div key={exp.id} className="game-card" onClick={() => openDetails(exp)}>
                  <div className="game-thumb">
                    <img src={exp.image_url || 'https://via.placeholder.com/150'} alt={exp.title} />
                  </div>
                  <div className="game-meta">
                    <span className="game-title">{exp.title}</span>
                    <div>👍 {exp.rating}%</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CHAT SECTION */}
          <section className="section">
            <h3>Global Chat</h3>
            <div className="chat-window">
              <div className="chat-log">
                {comments.map(c => (
                  <div key={c.id} className="chat-msg">
                    <span className="chat-user">[{c.username}]:</span> {c.content}
                  </div>
                ))}
              </div>
              <form className="chat-input" onSubmit={handlePost}>
                <input className="user-input" type="text" placeholder="User" value={user} onChange={(e) => setUser(e.target.value)} />
                <input className="msg-input" type="text" placeholder="Say..." value={msg} onChange={(e) => setMsg(e.target.value)} />
                <button type="submit">Send</button>
              </form>
            </div>
          </section>
        </div>
      </main>

      {/* MODALS */}
      {showDetailsModal && activeItem && (
        <div className="modal-backdrop" onClick={() => setShowDetailsModal(false)}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <img src={activeItem.image_url} alt="" className="modal-avatar" />
            <h2>{activeItem.title || activeItem.name}</h2>
            <p className="modal-desc">{activeItem.description || "No description provided."}</p>
            <button className="btn-secondary" onClick={() => setShowDetailsModal(false)}>Close</button>
          </div>
        </div>
      )}

      {showConnectModal && (
        <div className="modal-backdrop" onClick={() => setShowConnectModal(false)}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <h2>Connect with Charles</h2>
            <form onSubmit={handleAddConnection} className="modal-form">
              <label>Name</label>
              <input type="text" placeholder="Your name" value={connName} onChange={(e) => setConnName(e.target.value)} className="modal-input" required />
              <label>About You</label>
              <textarea placeholder="Write a short bio..." value={connDesc} onChange={(e) => setConnDesc(e.target.value)} className="modal-input" style={{minHeight: '80px', resize: 'none'}} />
              <label>Profile Image</label>
              <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} className="modal-input" accept="image/*" />
              <div className="modal-buttons">
                <button type="submit" className="btn-primary" disabled={isUploading}>{isUploading ? 'Connecting...' : 'Connect'}</button>
                <button type="button" className="btn-secondary" onClick={() => setShowConnectModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;