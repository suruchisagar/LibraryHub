const express = require('express');
const pool = require('../db.js');
const { authenticate, requireAdmin } = require('../middleware.js');

const plansRouter = express.Router();

// Get all plans
plansRouter.get('/', authenticate, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM plans ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching plans:', err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a single plan by ID
plansRouter.get('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM plans WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Plan not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching plan:', err);
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new plan
plansRouter.post('/', authenticate, requireAdmin, async (req, res) => {
  const { name, description, monthly_fee, seat_limit } = req.body;

  if (!name || !monthly_fee || !seat_limit) {
    return res.status(400).json({ message: "Name, monthly_fee, and seat_limit are required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO plans (name, description, monthly_fee, seat_limit, created_at)
       VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
      [name, description, monthly_fee, seat_limit]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating plan:', err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a plan
plansRouter.put('/:id', authenticate, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, description, monthly_fee, seat_limit } = req.body;

  try {
    const result = await pool.query(
      `UPDATE plans SET
         name = COALESCE($1, name),
         description = COALESCE($2, description),
         monthly_fee = COALESCE($3, monthly_fee),
         seat_limit = COALESCE($4, seat_limit)
       WHERE id = $5
       RETURNING *`,
      [name, description, monthly_fee, seat_limit, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating plan:', err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a plan
plansRouter.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM plans WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json({ message: "Plan deleted successfully" });
  } catch (err) {
    console.error('Error deleting plan:', err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = plansRouter;
