import prisma from "../lib/prisma.js";

export const updateUser = async (req, res) => {
    const id = req.params.id;
    const { name, email, address, zipCode, isAdmin } = req.body;
    
    try {
        const userExists = await prisma.user.findUnique({
            where: { id }
          });

        // Verificar se o novo email já está em uso por outro usuário
        if (email && email !== userExists.email) {
            const emailTaken = await prisma.user.findUnique({
            where: { email },
            });
    
            if (emailTaken && emailTaken.id !== id) {
            return res.status(400).json({ message: "Este email já está em uso por outro usuário." });
            }
        }
      
        if (!userExists) {
        return res.status(404).json({ message: "Usuário não encontrado" });
        }
        
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                name, email, address, zipCode, isAdmin
            }
        });

        console.log(updatedUser);

        res.status(200).json(updatedUser);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Falha ao atualizar o perfil do usuário!'});
    }
}