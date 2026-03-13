import express from 'express'
import { pool } from '../db/index.js'

const router = express.Router()

router.get('/', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM pitch_bookings ORDER BY date, time')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', async (req, res) => {
  const { name, email, date, time, duration } = req.body
  try {
    const { rows } = await pool.query(
      'INSERT INTO pitch_bookings (name, email, date, time, duration) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, date, time, duration]
    )
    res.status(201).json(rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM pitch_bookings WHERE id = $1', [req.params.id])
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
