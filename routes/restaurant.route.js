import express from 'express';
import { createRestaurant, getAllRestaurants, getRestaurant, getRestaurantByUserId } from '../controllers/restaurant.controller.js';
import { verifyToken } from '../middleware/verifytoken.js';

const router = express.Router();

router.post("/", verifyToken, createRestaurant);
router.get("/", getAllRestaurants);
router.get("/:id", getRestaurant);
router.get("/userRestaurant/:id", getRestaurantByUserId);

export default router;