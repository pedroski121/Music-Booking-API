import express from 'express';
import { auth } from '../auth/auth.middleware';
import { getVenues, getVenueDetails, getVenueEvents, createVenue, updateVenueDetails } from './venue.controller';

const router = express.Router();

// Get Venues
router.get("/api/venues", getVenues);

// Get Venue Details
router.get("/api/venues/:id", getVenueDetails);

// Get Events at Venue
router.get("/api/venues/:id/events", getVenueEvents);

// Create Venue
router.post("/api/venues", auth, createVenue)

// Update Venue Details
router.patch("/api/venues/:id", auth, updateVenueDetails)



export {router as venueRoutes};