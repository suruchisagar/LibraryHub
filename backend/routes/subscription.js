const express = require('express');
const pool = require('../db.js'); // Assuming you have a db.js for PostgreSQL connection pooling
const { authenticate, requireAdmin } = require('../middleware.js'); // Assuming your authentication and authorization middleware

const clientSubscriptionsRouter = express.Router();

// --- Get all client subscriptions ---
// Accessible by authenticated users. Consider adding requireAdmin if only admins should see all.
clientSubscriptionsRouter.get('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM client_subscriptions ORDER BY started_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching client subscriptions:', err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- Get a single client subscription by ID ---
// Accessible by authenticated users.
clientSubscriptionsRouter.get('/:id', authenticate, async (req, res) => {
  const { id } = req.params; // Assuming 'id' is the primary key for the client_subscriptions table
  try {
    const result = await pool.query('SELECT * FROM client_subscriptions WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Client subscription not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching client subscription:', err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- Create a new client subscription ---
// Typically, only admins or internal systems should create subscriptions directly.
clientSubscriptionsRouter.post('/', authenticate, requireAdmin, async (req, res) => {
  const { client_id, plan_id, started_at, expires_at, status } = req.body;

  // Basic validation: client_id, plan_id, started_at, and expires_at are crucial.
  if (!client_id || !plan_id || !started_at || !expires_at) {
    return res.status(400).json({ message: "client_id, plan_id, started_at, and expires_at are required" });
  }

  try {
    const result = await pool.query(
      // Corrected: Removed 'created_at' from the column list, and 'NOW()' from the VALUES
      // This assumes your 'created_at' column in the DB has DEFAULT NOW()
      `INSERT INTO client_subscriptions (client_id, plan_id, started_at, expires_at, status)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [client_id, plan_id, started_at, expires_at, status || 'active']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating client subscription:', err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- Update a client subscription ---
// Only admins should be able to update subscriptions.
clientSubscriptionsRouter.put('/:id', authenticate, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { client_id, plan_id, started_at, expires_at, status } = req.body;

  try {
    const result = await pool.query(
      `UPDATE client_subscriptions SET
           client_id = COALESCE($1, client_id),
           plan_id = COALESCE($2, plan_id),
           started_at = COALESCE($3, started_at),
           expires_at = COALESCE($4, expires_at),
           status = COALESCE($5, status),
           updated_at = NOW()
         WHERE id = $6
         RETURNING *`,
      [client_id, plan_id, started_at, expires_at, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Client subscription not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating client subscription:', err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- Delete a client subscription ---
// Deleting subscriptions should typically be restricted to admins.
clientSubscriptionsRouter.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM client_subscriptions WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Client subscription not found" });
    }

    res.json({ message: "Client subscription deleted successfully" });
  } catch (err) {
    console.error('Error deleting client subscription:', err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = clientSubscriptionsRouter;