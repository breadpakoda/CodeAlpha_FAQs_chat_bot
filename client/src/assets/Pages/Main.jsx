import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'

function Main() {
  const [query, setQuery] = useState('')
  // Chat history state
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your FAQ assistant. How can I help you today?' }
  ])
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!query.trim()) return

    const userMessage = { sender: 'user', text: query.trim() }
    setMessages(prev => [...prev, userMessage])
    setQuery('')
    setLoading(true)

    try {
      const response = await axios.post('http://localhost:3000/query', {
        question: userMessage.text,
      })
      
      const botMessage = { sender: 'bot', text: response.data.answer }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      const errorMessage = { sender: 'bot', text: 'Error: ' + error.message }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      {/* Header */}
      <header className="glass-panel" style={{ padding: '20px', textAlign: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, background: 'linear-gradient(135deg, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0 0 5px 0' }}>
          FAQ Chatbot
        </h1>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Made by Aditya • <a href="mailto:adityasing272@gmail.com" style={{ color: 'var(--primary)', textDecoration: 'none' }}>adityasing272@gmail.com</a>
        </div>
      </header>

      {/* Chat History */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: 'var(--max-width)', width: '100%', margin: '0 auto' }}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`animate-fade-in ${msg.sender === 'user' ? 'message-user' : 'message-bot'} message-bubble`}>
            {msg.text}
          </div>
        ))}
        
        {loading && (
          <div className="typing-indicator animate-fade-in">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="glass-panel" style={{ padding: '16px 0', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 'auto' }}>
        <div className="input-container" style={{ padding: '0 20px' }}>
          <form onSubmit={handleSubmit} className="input-box glass-panel" style={{ background: 'rgba(15, 23, 42, 0.6)' }}>
            <input
              type="text"
              className="chat-input"
              placeholder="Type your question..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={loading}
            />
            <button type="submit" className="send-button" disabled={loading || !query.trim()}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Main
