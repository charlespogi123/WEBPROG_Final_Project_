import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';

// Using your provided credentials directly
const supabase = createClient(
  'https://mfqubfjakdfsmsszaxai.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mcXViZmpha2Rmc21zc3pheGFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2NjkxODcsImV4cCI6MjA4NzI0NTE4N30.Q7VjclZFeK9kjV1qohE4iLTilOJlVS0o10b8OYqG8PM'
);

function App() {
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState('');
  const [msg, setMsg] = useState('');
  const [connections, setConnections] = useState([]);
  
  // Modal & Upload State
  const [showModal, setShowModal] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  // Fetch Logic
  const fetchData = async () => {
    try {
      // Fetch Comments from your NestJS backend
      const res = await fetch(`${BACKEND_URL}/comments`);
      const data = await res.json();
      setComments(data);

      // Fetch Connections directly from Supabase
      const { data: connData } = await supabase
        .from('connections')
        .select('*')
        .order('created_at', { ascending: false });
      if (connData) setConnections(connData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleConnect = async (e) => {
    e.preventDefault();
    if (!newFriendName) return alert("Please enter a name!");
    setIsUploading(true);

    let finalImg = 'https://tr.rbxcdn.com/30day-avatarheadshot/150/150/AvatarHeadshot/Png';

    try {
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        
        // 1. Upload to 'avatars' bucket
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, selectedFile);

        if (uploadError) throw uploadError;

        // 2. Get Public URL
        const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
        finalImg = data.publicUrl;
      }

      // 3. Insert into Database
      const { error: dbError } = await supabase
        .from('connections')
        .insert([{ name: newFriendName, image_url: finalImg }]);

      if (dbError) throw dbError;

      // Reset UI
      setNewFriendName('');
      setSelectedFile(null);
      setShowModal(false);
      fetchData(); 
    } catch (err) {
      alert("Error connecting: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!user || !msg) return alert("Fill in both!");
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

  return (
    <div className="charblox-container">
      {/* CONNECTION MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Connect with Charles</h3>
            <form onSubmit={handleConnect}>
              <label>What's your name?</label>
              <input 
                type="text" 
                placeholder="Username..." 
                value={newFriendName}
                onChange={(e) => setNewFriendName(e.target.value)}
                required
              />
              <label>Upload Profile Picture</label>
              <input 
                type="file" 
                accept="image/*"
                className="file-input-field"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="save-btn" disabled={isUploading}>
                  {isUploading ? "Uploading..." : "Connect"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <header className="charblox-nav">
        <div className="nav-left">
          <div className="menu-icon">☰</div>
          <h1 className="logo">CHARBLOX</h1>
        </div>
        <div className="nav-search-container">
          <input type="text" placeholder="Search Experiences" className="nav-search-input" />
        </div>
        <div className="nav-right">
          <span className="robux-count">⏣ 1M+</span>
          <div className="user-settings">⚙️</div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <section className="charblox-hero">
          <div className="avatar-circle">
            <img src="https://tr.rbxcdn.com/30day-avatarheadshot/150/150/AvatarHeadshot/Png" alt="Charles" />
          </div>
          <h2>Hello, <span className="username">Charles</span>!</h2>
        </section>

        <section className="charblox-section">
          <h3>Connections ({connections.length})</h3>
          <div className="friends-scroll">
            <div className="friend-item connect-trigger" onClick={() => setShowModal(true)}>
              <div className="friend-img-placeholder connect-plus">+</div>
              <span className="friend-name">Connect</span>
            </div>

            {connections.map((f) => (
              <div key={f.id} className="friend-item">
                <div className="friend-img-placeholder">
                  <img src={f.image_url} alt={f.name} className="friend-avatar-img" />
                </div>
                <span className="friend-name">{f.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="charblox-section">
          <h3>My Experiences</h3>
          <div className="experience-grid">
            <div className="exp-card">
              <div className="exp-banner port-tycoon"></div>
              <div className="exp-info">
                <h4>Portfolio Tycoon</h4>
                <p className="rating">👍 98%</p>
              </div>
            </div>
            <div className="exp-card">
              <div className="exp-banner react-sim"></div>
              <div className="exp-info">
                <h4>React Simulator</h4>
                <p className="rating">👍 100%</p>
              </div>
            </div>
          </div>
        </section>

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