import express from 'express'
import { pool } from '../db/index.js'

const router = express.Router()

router.get('/', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM scores ORDER BY date DESC')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', async (req, res) => {
  const { home_team, away_team, home_score, away_score, date } = req.body
  try {
    const { rows } = await pool.query(
      'INSERT INTO scores (home_team, away_team, home_score, away_score, date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [home_team, away_team, home_score, away_score, date]
    )
    res.status(201).json(rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM scores WHERE id = $1', [req.params.id])
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
