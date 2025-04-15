/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Atualiza os dados do usuário pelo ID
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário a ser atualizado
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
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               zipCode:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Dados do usuário atualizados com sucesso
 *       400:
 *         description: Email já em uso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao atualizar o usuário
 */

import express from 'express';
import { updateUser } from '../controllers/user.controller.js';

const router = express.Router();

router.put("/:id", updateUser);

export default router;