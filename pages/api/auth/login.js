import { supabase } from '../../../lib/supabaseClient'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña son obligatorios' })
  }

  try {
    // Buscar usuario
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single()

    if (error || !user) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' })
    }

    // Verificar contraseña
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' })
    }

    // No enviar la contraseña en la respuesta
    const { password: _, ...userWithoutPassword } = user

    return res.status(200).json({ success: true, user: userWithoutPassword })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
