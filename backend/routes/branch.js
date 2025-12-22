const express = require('express');
const pool = require('../db.js');
const branchRouter = express.Router();

const{requireAdmin, authenticate} = require('../middleware.js');




// GET /branches - List all branches under a client
branchRouter.get('/',authenticate, requireAdmin, async (req, res) => {
  const { client_id } = req.query;

  try {
    const result = client_id
      ? await pool.query(`SELECT * FROM branches WHERE client_id = $1`, [client_id])
      : await pool.query(`SELECT * FROM branches`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /branches/:id - Get specific branch details
branchRouter.get('/:id',authenticate, requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`SELECT * FROM branches WHERE id = $1`, [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Branch not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /branches - Create new branch
branchRouter.post('/', authenticate, requireAdmin, async (req, res) => {
  const { client_id, name, address, capacity } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO branches (client_id, name, address, capacity)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [client_id, name, address, capacity]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /branches/:id - Update branch info
branchRouter.put('/:id',authenticate, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, address, capacity } = req.body;

  try {
    const result = await pool.query(
      `UPDATE branches
       SET name = $1, address = $2, capacity = $3
       WHERE id = $4 RETURNING *`,
      [name, address, capacity, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Branch not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /branches/:id - Delete branch and related data
branchRouter.delete('/:id',authenticate, requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('BEGIN');

    // Delete bookings for seats in the branch
    await pool.query(`
      DELETE FROM bookings
      WHERE seat_id IN (
        SELECT id FROM seats WHERE branch_id = $1
      )
    `, [id]);

    // Delete seats
    await pool.query(`DELETE FROM seats WHERE branch_id = $1`, [id]);

    // Delete the branch
    const result = await pool.query(`DELETE FROM branches WHERE id = $1 RETURNING *`, [id]);

    await pool.query('COMMIT');

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Branch not found" });
    }

    res.json({ message: "Branch and related data deleted." });
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports= branchRouter;
