import express from 'express'
import { userRoutes } from '../api/users/user.routes';
import { authRoutes } from '../api/auth/auth.routes';
import { artistRoutes } from '../api/artists/artist.routes';
import { eventRoutes } from '../api/events/event.routes';
import { venueRoutes } from '../api/venues/venue.routes';
import { bookingRoutes } from '../api/bookings/booking.routes';


const router = express.Router();

router.use(userRoutes);
router.use(authRoutes );
router.use(artistRoutes);
router.use(eventRoutes );
router.use(venueRoutes );
router.use(bookingRoutes);

export {router as routes}