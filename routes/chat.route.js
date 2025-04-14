import express from 'express';
import { saveMessage, getMessages } from '../controllers/chat.controller.js';

const router = express.Router();

router.get("/:id", getMessages);
router.post("/:id", saveMessage);

export default router;