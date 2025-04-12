import express from 'express'
import { createNewOrder, deleteOrder, getAllOrders, getOrders, updateOrder } from '../controllers/orders.controller.js';

const router = express.Router();

router.get("/", getAllOrders);
router.get("/:id", getOrders);
router.post("/:id", createNewOrder);
// router.post("/saveOrder/:id", saveOrderOnUser);
router.put("/updateOrder/:id", updateOrder);
router.delete("/deleteOrder/:id", deleteOrder);

export default router;