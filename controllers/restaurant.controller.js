import prisma from "../lib/prisma.js";

export const createRestaurant = async(req,res) => {
    const { name, logo, banner, address, zipCode, description, type, menuOptions, userId, isOpen } = req.body;
    
    try {
        const newRestaurant = await prisma.restaurant.create({
            data: {
                name,
                logo,
                banner,
                address,
                zipCode,
                description,
                type,
                menuOptions,
                userId,
                isOpen
            },
        });

        console.log(newRestaurant);

        res.status(200).json("Restaurante criado com sucesso");

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Falha ao criar o restaurante"});
    }
}

export const getAllRestaurants = async(req,res) => {
    try {
        const getRestaurants = await prisma.restaurant.findMany({
            include: {
                dishes:true,
                orders:true,
                avaliations:true
            }
        });

        res.status(200).json(getRestaurants);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Falha ao consultar os dados do restaurante"});
    }
}

export const getRestaurant = async(req,res) => {
    const id = req.params.id;

    try {
        const restaurant = await prisma.restaurant.findUnique({
            where: { id },
            include: {
                dishes:true,
                orders: true,
                avaliations:true
            }
        });

        res.status(200).json(restaurant);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Falha ao consultar os dados do restaurante"});
    }
}

export const getRestaurantByUserId = async(req, res) => {
    const userId = req.params.id;

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        console.log(user);

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        if (!user.isAdmin) {
            return res.status(403).json({ message: "Acesso negado. Apenas administradores podem visualizar restaurantes." });
        }

        const restaurant = await prisma.restaurant.findMany({
            where: { userId },
            include: {
                dishes:true,
                orders: true,
                avaliations:true
            }
        });

        res.status(200).json(restaurant);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Falha ao consultar os dados do restaurante"});
    }
}

export const updateRestaurantBanner = async (req, res) => {
    const { id } = req.params;
    const { banner } = req.body;

    try {
        const findRestaurant = await prisma.restaurant.findUnique({
            where: { id }
        });

        if (!findRestaurant) {
            return res.status(404).json({ message: "Restaurante não encontrado" });
        }

        const updatedRestaurant = await prisma.restaurant.update({
            where: { id },
            data: { banner }
        });

        res.status(200).json({
            message: "Banner atualizado com sucesso",
            restaurant: updatedRestaurant
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Falha ao atualizar o banner do restaurante" });
    }
};

export const updateRestaurantLogo = async (req, res) => {
    const id = req.params.id
    const { logo } = req.body;

    try {
        const findRestaurant = await prisma.restaurant.findUnique({
            where: { id }
        });

        if (!findRestaurant) {
            return res.status(404).json({ message: "Restaurante não encontrado" });
        }

        const updatedLogo = await prisma.restaurant.update({
            where:{ id },
            data: { logo }
        });

        res.status(200).json({
            message:"Logo atualizada com sucesso.",
            restaurant: updatedLogo
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Falha ao atualizar a logo do restaurante"});
    }
}

export const updateRestaurantInfo = async (req, res) => {
    const id = req.params.id
    const { name, address, zipCode, description } = req.body;

    try {
        const findRestaurant = await prisma.restaurant.findUnique({
            where: { id }
        });

        if (!findRestaurant) {
            return res.status(404).json({ message: "Restaurante não encontrado" });
        }

        const updatedRestaurantInfo = await prisma.restaurant.update({
            where:{ id },
            data: { 
                name,
                address,
                zipCode,
                description,
                // menuOptions
             }
        });

        res.status(200).json({
            message:"Dados do restaurantes atualizados com sucesso.",
            restaurant: updatedRestaurantInfo
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Falha ao atualizar a logo do restaurante"});
    }
}

export const openRestaurant = async (req, res) => {
    const id = req.params.id
    const { isOpen } = req.body;

    try {
        const findRestaurant = await prisma.restaurant.findUnique({
            where: { id }
        });

        if (!findRestaurant) {
            return res.status(404).json({ message: "Restaurante não encontrado" });
        }

        const updateOpenRestaurant = await prisma.restaurant.update({
            where:{ id },
            data: { 
                isOpen
             }
        });

        res.status(200).json({
            message:"Restaurante aberto com sucesso.",
            restaurant: updateOpenRestaurant
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Falha ao abrir o restaurante."});
    }
}

export const createAvaliation = async (req, res) => {
    const { stars, comment, restaurantId, userId } = req.body;
  
    try {
      // Buscar nome do usuário
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
  
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
  
      const newAvaliation = await prisma.avaliation.create({
        data: {
          stars,
          comment,
          userName: user.name,
          restaurant: {
            connect: { id: restaurantId },
          },
          user: {
            connect: { id: userId },
          },
        },
      });

      console.log('aqui', newAvaliation);
  
      res.status(201).json(newAvaliation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao salvar avaliação" });
    }
  };
  