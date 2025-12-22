const express = require('express');
const pool = require('../db.js');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {authenticate}= require('../middleware.js');

authRouter.post('/register', async (req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const role_id=req.body.role_id;
    const phone=req.body.phone;
     
    
    try{
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users (full_name, email, password_hash, role_id,phone)
             VALUES ($1, $2, $3, $4, $5) RETURNING id, full_name, email, role_id, phone`,
        [name, email, hashedPassword, role_id, phone]
        );

        res.status(201).json(result.rows[0]);

    }catch(err){
        
        if (err.code === '23505') { // unique_violation
          res.status(400).json({ message: "Email already registered" });
        } else {
          console.error(err);
        res.status(500).json({ message: "Server error" });
        }
    }
});

//login
authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body; 
  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    const user = result.rows[0];
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role_id: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, full_name:user.full_name, email:user.email, role_id:user.role_id});
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
     }
});

//me
authRouter.get('/me', authenticate, async (req, res) => {
  try {

    const user = req.user;
    const result = await pool.query(
      `SELECT id, full_name, email, role_id FROM users WHERE id = $1`,
      [user.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = authRouter;

