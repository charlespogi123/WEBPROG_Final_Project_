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

  // Connections State
  const [showModal, setShowModal] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');
  // New state for the selected file
  const [selectedFile, setSelectedFile] = useState(null);
  // State to disable button while uploading
  const [isUploading, setIsUploading] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const fetchComments = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/comments`);
      const data = await res.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const fetchConnections = async () => {
    const { data, error } = await supabase
      .from('connections')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) console.error('Error fetching connections:', error);
    else setConnections(data);
  };

  useEffect(() => {
    fetchComments();
    fetchConnections();
  }, []);

  const handleConnect = async (e) => {
    e.preventDefault();
    if (!newFriendName) return alert("Please enter a name!");
    setIsUploading(true);

    // Default image if no file is selected
    let finalImgUrl = 'https://tr.rbxcdn.com/30day-avatarheadshot/150/150/AvatarHeadshot/Png';

    try {
      // 1. Upload file if one was selected
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars') // Make sure you have a public bucket named 'avatars'
          .upload(filePath, selectedFile);

        if (uploadError) throw uploadError;

        // 2. Get public URL for the uploaded file
        const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
        finalImgUrl = data.publicUrl;
      }

      // 3. Save connection to database
      const { error: dbError } = await supabase
        .from('connections')
        .insert([{ name: newFriendName, image_url: finalImgUrl }]);

      if (dbError) throw dbError;

      // 4. Reset form and fetch new data
      setNewFriendName('');
      setSelectedFile(null);
      setShowModal(false);
      fetchConnections();
    } catch (error) {
      console.error('Error connecting:', error.message);
      alert('Error connecting. See console for details.');
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
      fetchComments();
    } catch (e) { console.error(e); }
  };

  return (
    <div className="charblox-container">
      {/* MODAL */}
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
              {/* Changed from text input to file input */}
              <input
                type="file"
                accept="image/*"
                className="file-input"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="save-btn" disabled={isUploading}>
                  {isUploading ? 'Uploading...' : 'Connect'}
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
              <span className="friend-name">Connect!</span>
            </div>

            {connections.map((f) => (
              <div key={f.id} className="friend-item">
                <div className="friend-img-placeholder">
                  <img src={f.image_url || 'https://tr.rbxcdn.com/30day-avatarheadshot/150/150/AvatarHeadshot/Png'} alt={f.name} className="friend-avatar-img" />
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