import express from 'express'
import { pool } from '../db/index.js'

const router = express.Router()

router.get('/', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM social_posts ORDER BY created_at DESC')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', async (req, res) => {
  const { content, author } = req.body
  try {
    const { rows } = await pool.query(
      'INSERT INTO social_posts (content, author) VALUES ($1, $2) RETURNING *',
      [content, author]
    )
    res.status(201).json(rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
