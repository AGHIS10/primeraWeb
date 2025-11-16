import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'

export default function Profile() {
  const { currentUser, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!currentUser) {
      router.push('/')
    }
  }, [currentUser, router])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (!currentUser) {
    return <div>Cargando...</div>
  }

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, Roboto, sans-serif',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '500px'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Mi Perfil</h1>
        
        <div style={{
          backgroundColor: '#f9f9f9',
          padding: '20px',
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold', color: '#666' }}>Nombre:</label>
            <p style={{ margin: '5px 0 0 0', fontSize: '16px' }}>{currentUser.nombre}</p>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold', color: '#666' }}>Apellidos:</label>
            <p style={{ margin: '5px 0 0 0', fontSize: '16px' }}>{currentUser.apellidos}</p>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold', color: '#666' }}>Nombre de usuario:</label>
            <p style={{ margin: '5px 0 0 0', fontSize: '16px' }}>@{currentUser.username}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Deslogarse
        </button>
      </div>
    </div>
  )
}
