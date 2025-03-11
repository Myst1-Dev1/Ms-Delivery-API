import express from 'express';
import { createRestaurant, getAllRestaurants, getRestaurant } from '../controllers/restaurant.controller.js';
import { verifyToken } from '../middleware/verifytoken.js';

const router = express.Router();

router.post("/", verifyToken, createRestaurant);
router.get("/", getAllRestaurants);
router.get("/:id", getRestaurant);

export default router;