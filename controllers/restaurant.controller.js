import prisma from "../lib/prisma.js";

export const createRestaurant = async(req,res) => {
    const { name, logo, banner, address, description, type, menuOptions, userId } = req.body;
    
    try {
        const newRestaurant = await prisma.restaurant.create({
            data: {
                name,
                logo,
                banner,
                address,
                description,
                type,
                menuOptions,
                userId
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
                dishes:true
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
                dishes:true
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
                dishes:true
            }
        });

        res.status(200).json(restaurant);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Falha ao consultar os dados do restaurante"});
    }
}