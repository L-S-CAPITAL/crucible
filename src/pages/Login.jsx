import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

export default function Login() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true })
  }, [isAuthenticated, navigate, from])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    const result = login({ email, password })
    setBusy(false)
    if (!result.ok) {
      setError(result.error)
      return
    }
    navigate(from, { replace: true })
  }

  return (
    <div className="auth-page animate-fade-in">
      <div className="auth-card glass-card">
        <p className="eyebrow">Account</p>
        <h1 className="auth-title">Log in to Crucible</h1>
        <p className="auth-lead">
          Access portfolio locks, inventory pulse, and hedge tooling. Demo: any email + password (6+ chars).
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span>Email</span>
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
              autoComplete="current-password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          {error && <p className="auth-error" role="alert">{error}</p>}

          <button type="submit" className="btn-primary auth-submit" disabled={busy}>
            {busy ? 'Signing in…' : 'Log in'}
          </button>
        </form>

        <p className="auth-switch">
          No account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  )
}
