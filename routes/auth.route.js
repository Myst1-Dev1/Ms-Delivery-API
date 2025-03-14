import express from 'express';
import { login, logout, register, registerRestaurant } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/register", register);
router.post("/registerRestaurant", registerRestaurant);
router.post("/login", login);
router.post("/logout", logout);

export default router;