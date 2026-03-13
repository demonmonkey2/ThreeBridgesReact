import express from 'express'
import { pool } from '../db/index.js'

const router = express.Router()

router.get('/', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM teams ORDER BY name')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM teams WHERE id = $1', [req.params.id])
    if (!rows[0]) return res.status(404).json({ message: 'Team not found' })
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', async (req, res) => {
  const { name, description, manager } = req.body
  try {
    const { rows } = await pool.query(
      'INSERT INTO teams (name, description, manager) VALUES ($1, $2, $3) RETURNING *',
      [name, description, manager]
    )
    res.status(201).json(rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.put('/:id', async (req, res) => {
  const { name, description, manager } = req.body
  try {
    const { rows } = await pool.query(
      'UPDATE teams SET name=$1, description=$2, manager=$3 WHERE id=$4 RETURNING *',
      [name, description, manager, req.params.id]
    )
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM teams WHERE id = $1', [req.params.id])
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
