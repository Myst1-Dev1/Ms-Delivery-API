/**
 * @swagger
 * /api/chat/{id}:
 *   get:
 *     summary: Busca todas as mensagens do chat de um pedido
 *     tags: [Chat]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do pedido (orderId)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mensagens carregadas com sucesso
 *       500:
 *         description: Erro ao buscar as mensagens
 */

/**
 * @swagger
 * /api/chat/{id}:
 *   post:
 *     summary: Salva uma nova mensagem no chat de um pedido
 *     tags: [Chat]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do pedido (orderId)
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [sender, message, timestamp]
 *             properties:
 *               sender:
 *                 type: string
 *                 example: cliente
 *               message:
 *                 type: string
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Mensagem salva com sucesso
 *       400:
 *         description: Dados incompletos
 *       500:
 *         description: Erro ao salvar a mensagem
 */

import express from 'express';
import { saveMessage, getMessages } from '../controllers/chat.controller.js';

const router = express.Router();

router.get("/:id", getMessages);
router.post("/:id", saveMessage);

export default router;