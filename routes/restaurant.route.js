/**
 * @swagger
 * /api/restaurant:
 *   post:
 *     summary: Cria um novo restaurante
 *     tags: [Restaurant]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, address, zipCode, description, type, userId]
 *             properties:
 *               name:
 *                 type: string
 *               logo:
 *                 type: string
 *               banner:
 *                 type: string
 *               address:
 *                 type: string
 *               zipCode:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *               menuOptions:
 *                 type: array
 *                 items:
 *                   type: string
 *               userId:
 *                 type: string
 *               isOpen:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Restaurante criado com sucesso
 *       500:
 *         description: Erro ao criar restaurante
 */

/**
 * @swagger
 * /api/restaurant:
 *   get:
 *     summary: Retorna todos os restaurantes com pratos, pedidos e avaliações
 *     tags: [Restaurant]
 *     responses:
 *       200:
 *         description: Lista de restaurantes
 *       500:
 *         description: Erro ao consultar dados
 */

/**
 * @swagger
 * /api/restaurant/{id}:
 *   get:
 *     summary: Busca um restaurante por ID
 *     tags: [Restaurant]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do restaurante
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do restaurante
 *       500:
 *         description: Erro ao consultar
 */

/**
 * @swagger
 * /api/restaurant/user/{id}:
 *   get:
 *     summary: Busca restaurante associado a um usuário administrador
 *     tags: [Restaurant]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurante encontrado
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao consultar
 */

/**
 * @swagger
 * /api/restaurant/banner/{id}:
 *   put:
 *     summary: Atualiza o banner do restaurante
 *     tags: [Restaurant]
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
 *             properties:
 *               banner:
 *                 type: string
 *     responses:
 *       200:
 *         description: Banner atualizado com sucesso
 *       404:
 *         description: Restaurante não encontrado
 *       500:
 *         description: Erro ao atualizar banner
 */

/**
 * @swagger
 * /api/restaurant/logo/{id}:
 *   put:
 *     summary: Atualiza a logo do restaurante
 *     tags: [Restaurant]
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
 *             properties:
 *               logo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logo atualizada com sucesso
 *       404:
 *         description: Restaurante não encontrado
 *       500:
 *         description: Erro ao atualizar logo
 */

/**
 * @swagger
 * /api/restaurant/info/{id}:
 *   put:
 *     summary: Atualiza dados básicos do restaurante
 *     tags: [Restaurant]
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
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               zipCode:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Dados atualizados com sucesso
 *       404:
 *         description: Restaurante não encontrado
 *       500:
 *         description: Erro ao atualizar
 */

/**
 * @swagger
 * /api/restaurant/open/{id}:
 *   put:
 *     summary: Atualiza status de abertura do restaurante
 *     tags: [Restaurant]
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
 *             properties:
 *               isOpen:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Status de abertura atualizado
 *       404:
 *         description: Restaurante não encontrado
 *       500:
 *         description: Erro ao atualizar status
 */

/**
 * @swagger
 * /api/restaurant/avaliation:
 *   post:
 *     summary: Cria uma nova avaliação para o restaurante
 *     tags: [Avaliation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [stars, comment, restaurantId, userId]
 *             properties:
 *               stars:
 *                 type: number
 *               comment:
 *                 type: string
 *               restaurantId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao salvar avaliação
 */

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