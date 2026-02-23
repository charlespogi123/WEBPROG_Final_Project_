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
  const [activeItem, setActiveItem] = useState(null);

  const BACKEND_URL = 'https://potential-orbit-jj4q97qvp9ppc56p9-3000.app.github.dev';

  const fetchData = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/comments`);
      if (res.ok) setComments(await res.json());
      const { data: conns } = await supabase.from('connections').select('*').order('created_at', { ascending: false });
      if (conns) setConnections(conns);
      const { data: exps } = await supabase.from('experiences').select('*').order('created_at', { ascending: true });
      if (exps) setExperiences(exps);
    } catch (e) { console.error(e); }
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

  const openDetails = (item) => {
    setActiveItem(item);
    setShowDetailsModal(true);
  };

  return (
    <div className="app-wrapper">
      <header className="navbar">
        <div className="nav-inner">
          <h1 className="brand">CHARBLOX</h1>
          <div className="search-bar">
            <input type="text" placeholder="Search experiences..." />
          </div>
          <div className="nav-icons">
            <span>⏣ 1M+</span>
            <span>⚙️</span>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="content-inner">
          <section className="hero">
            <img src="https://tr.rbxcdn.com/30day-avatarheadshot/150/150/AvatarHeadshot/Png" alt="Charles" />
            <h2>Hello, <span>Charles</span>!</h2>
          </section>

          <section className="section">
            <div className="section-head">
              <h3>Connections ({connections.length})</h3>
              <span className="see-all">See All →</span>
            </div>
            <div className="scroll-row">
              <div className="friend-card">
                <div className="circle-thumb plus">+</div>
                <span>Connect</span>
              </div>
              {connections.map(f => (
                <div key={f.id} className="friend-card" onClick={() => openDetails(f)}>
                  <div className="circle-thumb"><img src={f.image_url} alt={f.name} /></div>
                  <span>{f.name}</span>
                </div>
              ))}
            </div>
          </section>

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
                    <span className="game-title"><strong>{exp.title}</strong></span>
                    <div>👍 {exp.rating}%</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="section">
            <div className="section-head"><h3>Global Chat</h3></div>
            <div className="chat-window">
              <div className="chat-log">
                {comments.map(c => (
                  <div key={c.id} className="chat-msg">
                    <span style={{color: 'var(--blue)', fontWeight: 'bold'}}>[{c.username}]:</span> {c.content}
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

      {showDetailsModal && activeItem && (
        <div className="modal-backdrop" onClick={() => setShowDetailsModal(false)}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <h2>{activeItem.title || activeItem.name}</h2>
            <p>{activeItem.description || "No description provided."}</p>
            <button style={{marginTop: '20px', padding: '10px'}} onClick={() => setShowDetailsModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;