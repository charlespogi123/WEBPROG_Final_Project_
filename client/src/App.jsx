import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState('');
  const [msg, setMsg] = useState('');

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

  useEffect(() => {
    fetchComments();
  }, []);

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

      <main className="main-content">
        <section className="charblox-hero">
          <div className="avatar-circle">
            <img src="https://tr.rbxcdn.com/30day-avatarheadshot/150/150/AvatarHeadshot/Png" alt="Charles" />
          </div>
          <h2>Hello, <span className="username">Charles</span>!</h2>
        </section>

        <section className="charblox-section">
          <h3>Friends</h3>
          <div className="friends-scroll">
            {['React', 'NestJS', 'Supabase', 'Vercel', 'UI/UX', 'Node'].map(f => (
              <div key={f} className="friend-item">
                <div className="friend-img-placeholder"></div>
                <span className="friend-name">{f}</span>
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
              <input type="text" placeholder="Name" className="nav-search-input" value={user} onChange={(e) => setUser(e.target.value)} />
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