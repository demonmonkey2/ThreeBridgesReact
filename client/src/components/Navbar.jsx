import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      {/* Top bar */}
      <div className="topbar">
        <div className="topbar-inner">
          <span className="topbar-left">Isthmian League South East · Jubilee Field, Crawley</span>
          <div className="topbar-right">
            <a href="https://threebridgesfc.co.uk" target="_blank" rel="noopener noreferrer">Official Site</a>
            <a href="/login">Admin</a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="navbar">
        <div className="navbar-inner">
          <NavLink to="/" className="navbar-brand" onClick={close}>
            <img
              src="https://threebridgesfc.co.uk/wp-content/uploads/2023/10/Bridges-Hi-Res-No-Background.png"
              alt="Three Bridges FC Crest"
              className="navbar-crest-img"
            />
            <div className="navbar-name">
              <span className="navbar-name-top">Est. 1901 · Crawley</span>
              <span className="navbar-name-main">THREE BRIDGES <em>FC</em></span>
            </div>
          </NavLink>

          <button className="navbar-toggle" onClick={() => setOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>

          <ul className={`navbar-links${open ? ' open' : ''}`}>
            <li><NavLink to="/" end onClick={close}>Home</NavLink></li>
            <li><NavLink to="/teams" onClick={close}>Teams</NavLink></li>
            <li><NavLink to="/scores" onClick={close}>Results</NavLink></li>
            <li><NavLink to="/videos" onClick={close}>Videos</NavLink></li>
            <li><NavLink to="/book-pitch" onClick={close}>Pitch Hire</NavLink></li>
            <li className="nav-cta"><NavLink to="/login" onClick={close}>Login</NavLink></li>
          </ul>
        </div>
      </nav>
    </>
  )
}
