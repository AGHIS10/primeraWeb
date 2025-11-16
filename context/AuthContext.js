import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(false)

  // Restaurar usuario desde sesión (si existe)
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
    }
  }, [])

  const register = async (nombre, apellidos, username, password) => {
    setLoading(true)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, apellidos, username, password })
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error }
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const login = async (username, password) => {
    setLoading(true)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error }
      }

      // Guardar usuario en localStorage
      localStorage.setItem('currentUser', JSON.stringify(data.user))
      setCurrentUser(data.user)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
  }

  return (
    <AuthContext.Provider value={{ currentUser, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
