import { useState } from 'react'
import { api } from '../api'

export default function PitchBookingPage() {
  const [form, setForm] = useState({ name: '', email: '', date: '', time: '', duration: '60' })
  const [status, setStatus] = useState(null)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      await api.post('/pitch-booking', form)
      setStatus('success')
      setForm({ name: '', email: '', date: '', time: '', duration: '60' })
    } catch (err) {
      setStatus('error: ' + err.message)
    }
  }

  return (
    <div>
      <div className="page-header" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=1400&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,18,28,0.78)' }} />
        <div className="page-header-inner animate-fadeup">
          <p className="page-header-eyebrow">Jubilee Field, Crawley</p>
          <h1>3G Pitch Hire</h1>
        </div>
      </div>

      <div className="page">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'start' }}>
          {/* Info panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="card" style={{ borderLeft: '3px solid var(--gold)' }}>
              <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>About the Pitch</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                Our 3G artificial pitch at Jubilee Field is available for hire for training sessions, 5-a-side, and friendly matches.
              </p>
            </div>
            {[
              { icon: '⏱', label: 'Sessions', value: '60, 90 or 120 minutes' },
              { icon: '📍', label: 'Location', value: 'Jubilee Field, Crawley' },
              { icon: '📞', label: 'Enquiries', value: 'Contact the club' },
            ].map(item => (
              <div key={item.label} className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem 1.25rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                <div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Booking form */}
          <div className="card">
            <h2 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '1.5rem' }}>Make a Booking</h2>

            {status === 'success' && (
              <div className="alert alert-success">Booking confirmed! We'll be in touch shortly.</div>
            )}
            {status && status.startsWith('error') && (
              <div className="alert alert-error">{status.replace('error: ', '')}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Name</label>
                <input name="name" placeholder="Full name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label>Date</label>
                  <input name="date" type="date" value={form.date} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input name="time" type="time" value={form.time} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group">
                <label>Duration</label>
                <select name="duration" value={form.duration} onChange={handleChange}>
                  <option value="60">60 minutes</option>
                  <option value="90">90 minutes</option>
                  <option value="120">120 minutes</option>
                </select>
              </div>
              <button type="submit" className="btn" style={{ width: '100%', justifyContent: 'center' }} disabled={status === 'loading'}>
                {status === 'loading' ? 'Submitting...' : 'Request Booking'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
