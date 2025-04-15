/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Cria uma nova conta de usuário ou restaurante
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               address:
 *                 type: string
 *               zipCode:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso
 *       500:
 *         description: Falha ao fazer cadastro
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Faz login e retorna o token + dados do usuário (sem senha)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Credenciais inválidas
 *       500:
 *         description: Falha ao fazer login
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Faz logout limpando o cookie de autenticação
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 */

import express from 'express';
import { login, logout, register } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;