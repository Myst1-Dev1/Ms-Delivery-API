/**
 * @swagger
 * /api/dishes:
 *   post:
 *     summary: Cria um novo prato
 *     tags: [Dish]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, description, price, image, menuOption, restaurantId]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *               menuOption:
 *                 type: string
 *               restaurantId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Prato criado com sucesso
 *       500:
 *         description: Erro ao criar o prato
 */

/**
 * @swagger
 * /api/dishes:
 *   get:
 *     summary: Retorna todos os pratos
 *     tags: [Dish]
 *     responses:
 *       200:
 *         description: Lista de pratos
 *       500:
 *         description: Erro ao consultar pratos
 */

/**
 * @swagger
 * /api/dishes/{id}:
 *   get:
 *     summary: Retorna os dados de um prato específico
 *     tags: [Dish]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do prato
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do prato
 *       500:
 *         description: Erro ao consultar prato
 */

/**
 * @swagger
 * /api/dishes/{id}:
 *   put:
 *     summary: Atualiza os dados de um prato
 *     tags: [Dish]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do prato
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *               menuOption:
 *                 type: string
 *               restaurantId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Prato atualizado com sucesso
 *       500:
 *         description: Erro ao atualizar prato
 */

/**
 * @swagger
 * /api/dishes/{id}:
 *   delete:
 *     summary: Deleta um prato
 *     tags: [Dish]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do prato
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Prato deletado com sucesso
 *       500:
 *         description: Erro ao deletar prato
 */

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