import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login, loading } = useAuth()
  const router = useRouter()
  const [form, setForm] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.username || !form.password) {
      setError('Nombre de usuario y contraseña son obligatorios')
      return
    }

    const result = await login(form.username, form.password)
    if (result.success) {
      router.push('/profile')
    } else {
      setError(result.error)
    }
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
        maxWidth: '400px'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Acceder</h1>
        
        {error && <div style={{
          backgroundColor: '#ffebee',
          color: '#c62828',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '15px'
        }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nombre de usuario</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                boxSizing: 'border-box',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                boxSizing: 'border-box',
                fontSize: '14px'
              }}
            />
          </div>

          <button type="submit" style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginBottom: '10px',
            opacity: loading ? 0.6 : 1,
            pointerEvents: loading ? 'none' : 'auto'
          }}>
            {loading ? 'Accediendo...' : 'Acceder'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <Link href="/">
            <button style={{
              backgroundColor: 'transparent',
              color: '#2196F3',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: '14px'
            }}>
              Volver a inicio
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
