import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

export default function Register() {
  const { register, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [plan, setPlan] = useState('starter')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true })
  }, [isAuthenticated, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    const result = register({ name, email, password, plan })
    setBusy(false)
    if (!result.ok) {
      setError(result.error)
      return
    }
    navigate(plan === 'enterprise' ? '/pricing' : '/dashboard', { replace: true })
  }

  return (
    <div className="auth-page animate-fade-in">
      <div className="auth-card glass-card">
        <p className="eyebrow">Account</p>
        <h1 className="auth-title">Create your Crucible account</h1>
        <p className="auth-lead">
          Start free, upgrade when you need portfolio locks and live physical inventory.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span>Full name</span>
            <input
              className="form-input"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Developer"
            />
          </label>
          <label className="auth-field">
            <span>Work email</span>
            <input
              className="form-input"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@developer.com.au"
            />
          </label>
          <label className="auth-field">
            <span>Password</span>
            <input
              className="form-input"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
            />
          </label>
          <label className="auth-field">
            <span>Starting plan</span>
            <select
              className="form-input"
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
            >
              <option value="starter">Starter — Free</option>
              <option value="professional">Professional — $490/mo</option>
              <option value="enterprise">Enterprise — Custom</option>
            </select>
          </label>

          {error && <p className="auth-error" role="alert">{error}</p>}

          <button type="submit" className="btn-primary auth-submit" disabled={busy}>
            {busy ? 'Creating…' : 'Register'}
          </button>
        </form>

        <p className="auth-switch">
          Already registered? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  )
}
