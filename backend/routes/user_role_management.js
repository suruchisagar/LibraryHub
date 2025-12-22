const express= require('express');
const pool = require('../db.js');
const UserRoleRouter= express.Router();

const{requireSuperAdmin, authenticate} = require('../middleware.js');


//user and role management

userRoleRouter.get('/users', async (req, res) => {
  try {
    // In a real userRoleRouterlication, implement authentication and check if the user is an admin
    const result = await pool.query('SELECT * FROM users ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user details by ID
userRoleRouter.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching user details:', err);
    res.status(500).json({ message: "Server error" });
  }
});

// Create new user (staff or internal)
userRoleRouter.post('/users', async (req, res) => {
  const { name, email, password, role_id } = req.body;
  if (!name || !email || !password || !role_id) {
    return res.status(400).json({ message: "name, email, password, and role_id are required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO users (name, email, password, role_id)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, password, role_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update user profile or roles
userRoleRouter.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role_id } = req.body;

  try {
    // Build dynamic query based on provided fields
    const fields = [];
    const values = [];
    let index = 1;

    if (name) {
      fields.push(`name = $${index++}`);
      values.push(name);
    }
    if (email) {
      fields.push(`email = $${index++}`);
      values.push(email);
    }
    if (password) {
      fields.push(`password = $${index++}`);
      values.push(password);
    }
    if (role_id) {
      fields.push(`role_id = $${index++}`);
      values.push(role_id);
    }

    if (fields.length === 0) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    values.push(id); // Add id as the last parameter

    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", user: result.rows[0] });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports= UserRoleRouter;
