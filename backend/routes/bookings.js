const express= require('express');
const pool = require('../db.js');
const { requireAdmin,authenticate } = require('../middleware.js');
const bookingRouter= express.Router();




// Get all bookings
bookingRouter.get('/', authenticate, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM bookings ORDER BY start_time DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get booking details by ID
bookingRouter.get('/:id', authenticate,requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM bookings WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching booking details:', err);
    res.status(500).json({ message: "Server error" });
  }
});

// Create new booking
bookingRouter.post('/',authenticate, async (req, res) => {
  const { user_id, seat_id, start_time, end_time } = req.body;
  if (!user_id || !seat_id || !start_time || !end_time) {
    return res.status(400).json({ message: "user_id, seat_id, start_time, and end_time are required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO bookings (user_id, seat_id, start_time, end_time, status)
       VALUES ($1, $2, $3, $4, 'confirmed') RETURNING *`,
      [user_id, seat_id, start_time, end_time]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({ message: "Server error" });
  }
});

// Cancel a booking
bookingRouter.put('/:id/cancel', authenticate, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const userRole = req.user.role_id;

  try {
    // Fetch the booking to verify ownership or admin access
    const result = await pool.query(
      'SELECT * FROM bookings WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const booking = result.rows[0];

    // Check if the logged-in user is either:
    // - the one who made the booking, or
    // - an admin
    console.log(booking.user_id,userRole);
    if (booking.user_id !== userId && userRole!=1) {
      return res.status(403).json({ message: "You are not allowed to cancel this booking" });
    }

    // Perform the cancellation
    const cancelResult = await pool.query(
      `UPDATE bookings SET status = 'cancelled' WHERE id = $1 RETURNING *`,
      [id]
    );

    res.json({ message: "Booking cancelled successfully", booking: cancelResult.rows[0] });

  } catch (err) {
    console.error('Error cancelling booking:', err);
    res.status(500).json({ message: "Server error" });
  }
});

//checkin router
// Mark as checked in
bookingRouter.put('/:id/checkin', authenticate, requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM bookings WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const booking = result.rows[0];

    // Don't allow check-in if booking is cancelled
    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: "Cannot check in to a cancelled booking" });
    }

    // Already checked in and not yet checked out
    if (booking.status === 'checked_in') {
      return res.status(400).json({ message: "Already checked in" });
    }

    // Perform check-in
    const checkinResult = await pool.query(
      `UPDATE bookings SET status = 'checked_in', checkin = NOW() WHERE id = $1 RETURNING *`,
      [id]
    );

    res.json({ message: "Checked in successfully", booking: checkinResult.rows[0] });

  } catch (err) {
    console.error('Error during check-in:', err);
    res.status(500).json({ message: "Server error" });
  }
});


bookingRouter.put('/:id/checkout', authenticate, requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM bookings WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const booking = result.rows[0];

    //  Cannot check out a cancelled booking
    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: "Cannot check out a cancelled booking" });
    }

    // Cannot check out without check-in
    if (booking.status !== 'checked_in') {
      return res.status(400).json({ message: "Cannot check out without checking in first" });
    }

    // Already checked out
    if (booking.checkout) {
      return res.status(400).json({ message: "Already checked out" });
    }

    // Perform checkout
    const checkoutResult = await pool.query(
      `UPDATE bookings SET status = 'checked_out', checkout = NOW() WHERE id = $1 RETURNING *`,
      [id]
    );

    res.json({ message: "Checked out successfully", booking: checkoutResult.rows[0] });

  } catch (err) {
    console.error('Error during checkout:', err);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin: View all bookings
bookingRouter.get('/admin/bookings', requireAdmin,authenticate, async (req, res) => {
  try {
    const bookingsResult = await pool.query(
      `SELECT b.* FROM bookings b
       JOIN seats s ON b.seat_id = s.id
       ORDER BY b.start_time DESC`
    );

    res.json(bookingsResult.rows);
  } catch (err) {
    console.error('Error fetching admin bookings:', err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports= bookingRouter;