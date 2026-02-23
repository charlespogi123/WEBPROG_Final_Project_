import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import './App.css'

const supabase = createClient(
  'https://mfqubfjakdfsmsszaxai.supabase.co',
  'YOUR_PUBLIC_ANON_KEY'
)

function App() {
  const [comments, setComments] = useState([])
  const [user, setUser] = useState('')
  const [msg, setMsg] = useState('')
  const [connections, setConnections] = useState([])
  const [experiences, setExperiences] = useState([])

  const [showConnectModal, setShowConnectModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [activeItem, setActiveItem] = useState(null)
  const [viewType, setViewType] = useState('')

  const [newFriendName, setNewFriendName] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

  const fetchData = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/comments`)
      if (res.ok) setComments(await res.json())

      const { data: conns } = await supabase
        .from('connections')
        .select('*')
        .order('created_at', { ascending: false })

      if (conns) setConnections(conns)

      const { data: exps } = await supabase
        .from('experiences')
        .select('*')
        .order('created_at', { ascending: true })

      if (exps) setExperiences(exps)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleConnect = async (e) => {
    e.preventDefault()
    setIsUploading(true)

    let finalImgUrl =
      'https://tr.rbxcdn.com/30day-avatarheadshot/150/150/AvatarHeadshot/Png'

    try {
      if (selectedFile) {
        const fileName = `${Date.now()}-${selectedFile.name}`
        await supabase.storage.from('avatars').upload(fileName, selectedFile)
        const { data } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName)
        finalImgUrl = data.publicUrl
      }

      await supabase.from('connections').insert([
        {
          name: newFriendName,
          image_url: finalImgUrl,
          description: newDescription
        }
      ])

      setNewFriendName('')
      setNewDescription('')
      setSelectedFile(null)
      setShowConnectModal(false)
      fetchData()
    } catch (err) {
      alert(err.message)
    } finally {
      setIsUploading(false)
    }
  }

  const handlePost = async (e) => {
    e.preventDefault()
    if (!user || !msg) return alert('Fill in both fields!')

    try {
      await fetch(`${BACKEND_URL}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, content: msg })
      })

      setUser('')
      setMsg('')
      fetchData()
    } catch (e) {
      console.error(e)
    }
  }

  const openDetails = (item, type) => {
    setActiveItem(item)
    setViewType(type)
    setShowDetailsModal(true)
  }

  return (
    <div className="app">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-container">
          <h1 className="brand">CHARBLOX</h1>

          <div className="search-bar">
            <input type="text" placeholder="Search experiences" />
          </div>

          <div className="nav-icons">
            <span>⏣ 1M+</span>
            <span>⚙️</span>
          </div>
        </div>
      </header>

      <main className="layout">
        <div className="container">
          {/* HERO */}
          <section className="hero">
            <img
              src="https://tr.rbxcdn.com/30day-avatarheadshot/150/150/AvatarHeadshot/Png"
              alt="avatar"
            />
            <h2>
              Hello, <span>Charles</span>!
            </h2>
          </section>

          {/* CONNECTIONS */}
          <section className="section">
            <div className="section-head">
              <h3>Connections</h3>
              <span className="see-all">See All →</span>
            </div>

            <div className="scroll-row">
              <div
                className="friend-card add-card"
                onClick={() => setShowConnectModal(true)}
              >
                <div className="circle-thumb plus">+</div>
                <span>Connect</span>
              </div>

              {connections.map((f) => (
                <div
                  key={f.id}
                  className="friend-card"
                  onClick={() => openDetails(f, 'profile')}
                >
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
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="game-card"
                  onClick={() => openDetails(exp, 'experience')}
                >
                  <div className="game-thumb">
                    <img
                      src={
                        exp.image_url ||
                        'https://via.placeholder.com/300'
                      }
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
                {comments.map((c) => (
                  <div key={c.id} className="chat-msg">
                    <b>[{c.username}]</b>: {c.content}
                  </div>
                ))}
              </div>

              <form onSubmit={handlePost} className="chat-input">
                <input
                  type="text"
                  placeholder="Name"
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
    </div>
  )
}

export default App