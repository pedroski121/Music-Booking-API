import express from 'express';
import { createBooking, getBookingDetails, getBookings, updateBooking } from './booking.controller';
import { body } from 'express-validator';
import { auth } from '../auth/auth.middleware';

const router = express.Router();

// Get bookings
router.get("/api/bookings", getBookings);

// Get booking details
router.get("/api/bookings/:id", getBookingDetails);


// Create booking request
router.post("/api/bookings", 
    auth, 
    body("eventId").isString().notEmpty(), 
    body("artistId").isString().notEmpty(), 
    body("performanceDate").isString().notEmpty(), 
    body("performanceDuration").isInt().notEmpty(), 
    body("performanceTime").isString().notEmpty(),
    createBooking
)

// Update booking details - Only artist booked or user that created the booking can update 
router.patch("/api/bookings/:id", auth, updateBooking);

export {router as bookingRoutes};
