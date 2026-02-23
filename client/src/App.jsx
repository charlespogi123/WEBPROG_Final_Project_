import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';

const supabase = createClient(
  'https://mfqubfjakdfsmsszaxai.supabase.co',
  'YOUR_PUBLIC_ANON_KEY'
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

      const { data: conns } = await supabase
        .from('connections')
        .select('*')
        .order('created_at', { ascending: false });
      if (conns) setConnections(conns);

      const { data: exps } = await supabase
        .from('experiences')
        .select('*')
        .order('created_at', { ascending: true });
      if (exps) setExperiences(exps);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!user || !msg) return;

    await fetch(`${BACKEND_URL}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user, content: msg })
    });

    setUser('');
    setMsg('');
    fetchData();
  };

  const openDetails = (item) => {
    setActiveItem(item);
    setShowDetailsModal(true);
  };

  return (
    <div className="app-wrapper">

      {/* NAVBAR */}
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

      {/* MAIN */}
      <main className="main-content">
        <div className="content-inner">

          {/* HERO */}
          <section className="hero">
            <img
              src="https://tr.rbxcdn.com/30day-avatarheadshot/150/150/AvatarHeadshot/Png"
              alt="Charles"
            />
            <h2>Hello, <span>Charles</span>!</h2>
          </section>

          {/* CONNECTIONS */}
          <section className="section">
            <div className="section-head">
              <h3>Connections ({connections.length})</h3>
            </div>

            <div className="scroll-row">
              {connections.map(f => (
                <div key={f.id} className="friend-card">
                  <div className="circle-thumb">
                    <img src={f.image_url} alt={f.name} />
                  </div>
                  <span>{f.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* EXPERIENCES */}
          <section className="section">
            <div className="section-head">
              <h3>My Experiences</h3>
            </div>

            <div className="experience-grid">
              {experiences.map(exp => (
                <div
                  key={exp.id}
                  className="game-card"
                  onClick={() => openDetails(exp)}
                >
                  <div className="game-thumb">
                    <img
                      src={exp.image_url || 'https://via.placeholder.com/300'}
                      alt={exp.title}
                    />
                  </div>
                  <div className="game-meta">
                    <span className="game-title">{exp.title}</span>
                    <span>👍 {exp.rating}%</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CHAT */}
          <section className="section">
            <h3>Global Chat</h3>
            <div className="chat-window">
              <div className="chat-log">
                {comments.map(c => (
                  <div key={c.id} className="chat-msg">
                    <span className="chat-user">[{c.username}]</span>
                    {c.content}
                  </div>
                ))}
              </div>

              <form className="chat-input" onSubmit={handlePost}>
                <input
                  type="text"
                  placeholder="User"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Say something..."
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                />
                <button type="submit">Send</button>
              </form>
            </div>
          </section>

        </div>
      </main>

      {/* MODAL */}
      {showDetailsModal && activeItem && (
        <div className="modal-backdrop" onClick={() => setShowDetailsModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <h2>{activeItem.title}</h2>
            <p>{activeItem.description || "No description provided."}</p>
            <button onClick={() => setShowDetailsModal(false)}>Close</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;