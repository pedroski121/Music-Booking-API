import express from 'express';
import { body } from 'express-validator';
import { auth } from '../auth/auth.middleware';
import { getArtists, getArtistProfile, createArtistProfile, updateArtistProfile } from './artist.controller';

const router = express.Router();

// List artists available
router.get("/api/artists", getArtists);

// Get artist profile
router.get("/api/artists/:id", getArtistProfile);

// Create artist profile 
router.post("/api/artists",
     auth,
     body("stageName").isString().notEmpty(), 
     body("bio").isString().notEmpty(), 
     body("priceTag").isInt().notEmpty(), 
     body("genres").isArray({min:1}),
     createArtistProfile);

// Update artist profile
router.patch("/api/artists", auth, updateArtistProfile);

export {router as artistRoutes}