import { createContext, useContext, useMemo, useState, useCallback } from 'react'

const STORAGE_KEY = 'crucible_auth_user'
const USERS_KEY = 'crucible_auth_users'

const AuthContext = createContext(null)

function loadUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadUser())

  const persistUser = useCallback((next) => {
    if (next) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
    setUser(next)
  }, [])

  const register = useCallback(({ name, email, password, plan = 'starter' }) => {
    const users = loadUsers()
    const normalized = email.trim().toLowerCase()
    if (users.some((u) => u.email === normalized)) {
      return { ok: false, error: 'An account with this email already exists.' }
    }
    if (password.length < 6) {
      return { ok: false, error: 'Password must be at least 6 characters.' }
    }
    const record = {
      id: `user-${Date.now()}`,
      name: name.trim() || normalized.split('@')[0],
      email: normalized,
      password,
      plan,
      createdAt: new Date().toISOString(),
    }
    users.push(record)
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
    const session = {
      id: record.id,
      name: record.name,
      email: record.email,
      plan: record.plan,
    }
    persistUser(session)
    return { ok: true, user: session }
  }, [persistUser])

  const login = useCallback(({ email, password }) => {
    const users = loadUsers()
    const normalized = email.trim().toLowerCase()
    const match = users.find((u) => u.email === normalized && u.password === password)
    if (!match) {
      // Demo fallback: any email/password of 6+ chars creates a session for demos
      if (password.length >= 6) {
        const session = {
          id: `demo-${Date.now()}`,
          name: normalized.split('@')[0] || 'Developer',
          email: normalized,
          plan: 'professional',
        }
        persistUser(session)
        return { ok: true, user: session }
      }
      return { ok: false, error: 'Invalid email or password.' }
    }
    const session = {
      id: match.id,
      name: match.name,
      email: match.email,
      plan: match.plan,
    }
    persistUser(session)
    return { ok: true, user: session }
  }, [persistUser])

  const logout = useCallback(() => {
    persistUser(null)
  }, [persistUser])

  const setPlan = useCallback((plan) => {
    setUser((prev) => {
      if (!prev) return prev
      const next = { ...prev, plan }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      const users = loadUsers().map((u) =>
        u.email === prev.email ? { ...u, plan } : u,
      )
      localStorage.setItem(USERS_KEY, JSON.stringify(users))
      return next
    })
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      setPlan,
    }),
    [user, login, register, logout, setPlan],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
