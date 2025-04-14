import prisma from "../lib/prisma.js";

export const getMessages = async (req, res) => {
    const orderId = req.params.id;
  
    try {
      const messages = await prisma.chat.findMany({
        where: { orderId },
        orderBy: { timestamp: 'asc' },
      });
  
      return res.status(200).json(messages);
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
      return res.status(500).json({ message: 'Erro ao buscar as mensagens' });
    }
};

export const saveMessage = async (req, res) => {
    const orderId = req.params.id;
    const { sender, message, timestamp } = req.body;
  
    if (!sender || !message || !timestamp) {
      return res.status(400).json({ message: "Dados incompletos para salvar mensagem." });
    }
  
    try {
      const savedMessage = await prisma.chat.create({
        data: {
          orderId,
          sender,
          message,
          timestamp: new Date(timestamp),
        },
      });
  
      return res.status(201).json(savedMessage);
    } catch (error) {
      console.error("Erro ao salvar mensagem:", error);
      return res.status(500).json({ message: "Erro ao salvar a mensagem do chat." });
    }
};