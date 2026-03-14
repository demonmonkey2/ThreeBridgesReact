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
          <span className="topbar-left">Three Bridges FC · Est. 1901 · Jubilee Field, Crawley</span>
          <div className="topbar-right">
            <a href="https://threebridgesfc.co.uk" target="_blank" rel="noopener noreferrer">Club Site</a>
            <NavLink to="/coaches">Coaches Portal</NavLink>
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
              <span className="navbar-name-main">THREE BRIDGES <em>ACADEMY</em></span>
            </div>
          </NavLink>

          <button className="navbar-toggle" onClick={() => setOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>

          <ul className={`navbar-links${open ? ' open' : ''}`}>
            <li><NavLink to="/" end onClick={close}>Home</NavLink></li>
            <li><NavLink to="/age-groups" onClick={close}>Age Groups</NavLink></li>
            <li><NavLink to="/curriculum" onClick={close}>Curriculum</NavLink></li>
            <li><NavLink to="/media" onClick={close}>Media</NavLink></li>
            <li><NavLink to="/training-guides" onClick={close}>Training Guides</NavLink></li>
            <li><NavLink to="/linesman-course" onClick={close}>🚩 Linesman</NavLink></li>
            <li className="nav-cta"><NavLink to="/coaches" onClick={close}>🔒 Coaches</NavLink></li>
          </ul>
        </div>
      </nav>
    </>
  )
}
