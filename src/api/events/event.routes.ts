import express from 'express';
import { auth } from '../auth/auth.middleware';
import { getEvents, getEventDetails, createEvent, updateEvent, deleteEvent} from './event.controller';
const router = express.Router();

// Get all events
router.get("/api/events", getEvents);

// Get event details
router.get("/api/events/:id", getEventDetails);

// Create event
router.post("/api/events", auth, createEvent);

// Update event
router.patch("/api/events/:id", auth, updateEvent);

// Remove event
router.delete("/api/events/:id", auth, deleteEvent);

export {router as eventRoutes}