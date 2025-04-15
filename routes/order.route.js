/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Retorna todos os pedidos
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *       500:
 *         description: Erro ao consultar os pedidos
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Retorna os pedidos de um restaurante
 *     tags: [Order]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do restaurante
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de pedidos do restaurante
 *       404:
 *         description: Restaurante não encontrado
 *       500:
 *         description: Erro ao consultar pedidos
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Order]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do restaurante
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userName, address, orderProductsName, restaurantId, userId, status]
 *             properties:
 *               userName:
 *                 type: string
 *               address:
 *                 type: string
 *               orderProductsName:
 *                 type: array
 *                 items:
 *                   type: string
 *               orderProductsImage:
 *                 type: array
 *                 items:
 *                   type: string
 *               orderProductsObservation:
 *                 type: array
 *                 items:
 *                   type: string
 *               zipCode:
 *                 type: string
 *               orderValue:
 *                 type: number
 *               restaurantId:
 *                 type: string
 *               userId:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pedido criado com sucesso
 *       404:
 *         description: Restaurante não encontrado
 *       500:
 *         description: Erro ao criar pedido
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Atualiza o status de um pedido
 *     tags: [Order]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do pedido
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso
 *       500:
 *         description: Erro ao atualizar pedido
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Remove um pedido
 *     tags: [Order]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do pedido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido deletado com sucesso
 *       500:
 *         description: Erro ao deletar pedido
 */

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