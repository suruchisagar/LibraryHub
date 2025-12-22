const express = require('express');
const pool = require('../db.js');
const seatTypeRouter = express.Router();

const { authenticate, requireAdmin } = require('../middleware.js');

// GET all seat types
seatTypeRouter.get('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM seat_types ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching seat types:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET a specific seat type by ID
seatTypeRouter.get('/:id', authenticate, requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM seat_types WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Seat type not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching seat type:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST create a new seat type
seatTypeRouter.post('/', authenticate, requireAdmin, async (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO seat_types (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating seat type:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update a seat type
seatTypeRouter.put('/:id', authenticate, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const result = await pool.query(
      `UPDATE seat_types
       SET name = COALESCE($1, name),
           description = COALESCE($2, description)
       WHERE id = $3
       RETURNING *`,
      [name, description, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Seat type not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating seat type:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a seat type
seatTypeRouter.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM seat_types WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Seat type not found' });
    }

    res.json({ message: 'Seat type deleted successfully' });
  } catch (err) {
    console.error('Error deleting seat type:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = seatTypeRouter;
