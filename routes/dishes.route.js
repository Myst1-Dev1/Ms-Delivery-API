import express from 'express';
import { verifyToken } from '../middleware/verifytoken.js';
import { createNewDishe, deleteDishe, getDishe, getDishes, updateDishe } from '../controllers/dishes.controller.js';

const router = express.Router();

router.post("/",  verifyToken, createNewDishe);
router.get("/", getDishes);
router.get("/:id", getDishe);
router.put("/:id", updateDishe);
router.delete("/:id", deleteDishe);

export default router