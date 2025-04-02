import express from 'express';
import connectDB from './config/database';
import 'dotenv/config'
import { userRoutes } from './api/users/user.routes';
import { authRoutes } from './api/auth/auth.routes';
import { artistRoutes } from './api/artists/artist.routes';
import { eventRoutes } from './api/events/event.routes';
import { venueRoutes } from './api/venues/venue.routes';
import { bookingRoutes } from './api/bookings/booking.routes';

const PORT:number = Number(process.env.PORT) || 5000;


const app = express();

app.use(express.json());

app.use(userRoutes);
app.use(authRoutes);
app.use(artistRoutes);
app.use(eventRoutes);
app.use(venueRoutes);
app.use(bookingRoutes);


app.listen(PORT, async ()=>{
    await connectDB();
    console.log(`Listening on port ${PORT}`);
})