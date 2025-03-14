import express from 'express'
import { createNewOrder, deleteOrder, getOrders, updateOrder } from '../controllers/orders.controller.js';

const router = express.Router();

router.get("/:id", getOrders);
router.post("/:id", createNewOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;