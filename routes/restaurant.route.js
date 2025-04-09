import express from 'express';
import { 
    createRestaurant, 
    getAllRestaurants, 
    getRestaurant, 
    getRestaurantByUserId, 
    updateRestaurantBanner,
    updateRestaurantLogo,
    updateRestaurantInfo,
    openRestaurant,
    createAvaliation
} from '../controllers/restaurant.controller.js';
import { verifyToken } from '../middleware/verifytoken.js';

const router = express.Router();

router.post("/", verifyToken, createRestaurant);
router.post("/avaliation/:id", createAvaliation);
router.get("/", getAllRestaurants);
router.get("/:id", getRestaurant);
router.get("/userRestaurant/:id", getRestaurantByUserId);
router.put("/banner/:id", updateRestaurantBanner);
router.put("/logo/:id", updateRestaurantLogo);
router.put("/info/:id", updateRestaurantInfo);
router.put("/open/:id", openRestaurant);

export default router;