const express= require('express');
const pool = require('../db.js');
const clientRouter= express.Router();

const{requireSuperAdmin, authenticate} = require('../middleware.js');



// GET /clients - List all clients (Super Admin)
clientRouter.get('/',authenticate, requireSuperAdmin, async (req, res) => {
  try {
    if (req.user.role_id !== 2) {
      return res.status(403).json({ message: "Only SuperAdmin can view clients." });
    }

    const result = await pool.query(`SELECT * FROM clients ORDER BY id`);
    res.json(result.rows);
  } catch (err) {   
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /clients/:id - Get a specific client
clientRouter.get('/:id',authenticate, requireSuperAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM clients WHERE id = $1`, [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /clients - Create a new client (Super Admin only)
clientRouter.post('/', authenticate,  requireSuperAdmin, async (req, res) => {
  const { name, contact_email, contact_phone, address } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO clients (name, contact_email, contact_phone, address)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, contact_email, contact_phone, address]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      res.status(400).json({ message: "Client name already exists" });
    } else {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
});

// PUT /clients/:id - Update client
clientRouter.put('/:id', authenticate, requireSuperAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, contact_email, contact_phone, address } = req.body;

  try {
    const result = await pool.query(
      `UPDATE clients
       SET name = $1,
           contact_email = $2,
           contact_phone = $3,
           address = $4
       WHERE id = $5
       RETURNING *`,
      [name, contact_email, contact_phone, address, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      res.status(400).json({ message: "Client name already exists" });
    } else {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
});

// DELETE /:id - Delete client and nested data (Super Admin)
clientRouter.delete('/:id',authenticate, requireSuperAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    // You may want to wrap this in a transaction
    await pool.query('BEGIN');

    // Delete bookings -> seats -> branches -> client
    await pool.query(`
      DELETE FROM bookings
      WHERE seat_id IN (
        SELECT id FROM seats
        WHERE branch_id IN (
          SELECT id FROM branches WHERE client_id = $1
        )
      )`, [id]);

    await pool.query(`
      DELETE FROM seats
      WHERE branch_id IN (
        SELECT id FROM branches WHERE client_id = $1
      )`, [id]);

    await pool.query(`DELETE FROM branches WHERE client_id = $1`, [id]);
    const result = await pool.query(`DELETE FROM clients WHERE id = $1 RETURNING *`, [id]);

    await pool.query('COMMIT');

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json({ message: "Client and all related data deleted." });
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports=clientRouter;
