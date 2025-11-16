import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  // Cargar usuarios desde localStorage al iniciar
  useEffect(() => {
    const savedUsers = localStorage.getItem('users')
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers))
    }
  }, [])

  const register = (nombre, apellidos, username, password) => {
    // Verificar que el usuario no exista
    if (users.some(u => u.username === username)) {
      return { success: false, error: 'El nombre de usuario ya existe' }
    }

    const newUser = { nombre, apellidos, username, password }
    const updatedUsers = [...users, newUser]
    setUsers(updatedUsers)
    localStorage.setItem('users', JSON.stringify(updatedUsers))
    return { success: true }
  }

  const login = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password)
    if (user) {
      setCurrentUser(user)
      return { success: true }
    }
    return { success: false, error: 'Usuario o contraseña incorrectos' }
  }

  const logout = () => {
    setCurrentUser(null)
  }

  return (
    <AuthContext.Provider value={{ users, currentUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
