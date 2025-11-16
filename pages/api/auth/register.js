import { supabase } from '../../../lib/supabaseClient'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const { nombre, apellidos, username, password } = req.body

  if (!nombre || !apellidos || !username || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' })
  }

  try {
    // Verificar que el usuario no exista
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('username', username)
      .single()

    if (existingUser) {
      return res.status(400).json({ error: 'El nombre de usuario ya existe' })
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insertar usuario
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          nombre,
          apellidos,
          username,
          password: hashedPassword
        }
      ])
      .select()

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    return res.status(201).json({ success: true, user: data[0] })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
