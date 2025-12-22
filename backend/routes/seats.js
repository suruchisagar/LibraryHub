const express= require('express');
const pool = require('../db.js');
const seatsRouter= express.Router();

const{requireSuperAdmin, requireAdmin, authenticate} = require('../middleware.js');

//Get all seats in a branch
seatsRouter.get('/', authenticate, requireAdmin, async (req, res) => {
  const { branch_id } = req.query;
  if (!branch_id) {
    return res.status(400).json({ message: "branch_id is required" });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM seats WHERE branch_id = $1 ORDER BY label',
      [branch_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching seats:', err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a specific seat by ID
seatsRouter.get('/:id', authenticate, requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM seats WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Seat not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching seat:', err);
    res.status(500).json({ message: "Server error" });
  }
});

//Create a new seat
seatsRouter.post('/', authenticate, requireAdmin,async (req, res) => {
  const { branch_id, label, is_active = true, seat_type_id } = req.body;

  if (!branch_id || !label) {
    return res.status(400).json({ message: "branch_id and label are required" });
  }

  try {
    const result = await pool.query(
      'INSERT INTO seats (branch_id, label, is_active, seat_type_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [branch_id, label, is_active, seat_type_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating seat:', err);
    res.status(500).json({ message: "Server error" });
  }
});

//Update seat information
seatsRouter.put('/:id', authenticate, requireAdmin,async (req, res) => {
  const { id } = req.params;
  const { label, is_active, seat_type_id } = req.body;

  try {
    const result = await pool.query(
      `UPDATE seats SET
        label = COALESCE($1, label),
        is_active = COALESCE($2, is_active),
        seat_type_id = COALESCE($3, seat_type_id)
      WHERE id = $4
      RETURNING *`,
      [label, is_active, seat_type_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Seat not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating seat:', err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a seat
seatsRouter.delete('/:id',authenticate, requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM seats WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Seat not found" });
    }

    res.json({ message: "Seat deleted successfully" });
  } catch (err) {
    console.error('Error deleting seat:', err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports= seatsRouter;