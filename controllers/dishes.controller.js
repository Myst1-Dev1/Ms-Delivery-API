import prisma from "../lib/prisma.js";

export const createNewDishe = async(req, res) => {
    const { name, description, price, image, menuOption, restaurantId } = req.body;
    
    try {
        const createDishe = await prisma.dishes.create({
            data: {
                name, description, price, image, menuOption, restaurantId
            }
        });

        res.status(200).json(createDishe);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Erro ao criar um prato!"})
    }
}

export const getDishes = async(req, res) => {
    try {
        const getAllDishes = await prisma.dishes.findMany();

        res.status(200).json(getAllDishes);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Erro ao consultar dados dos pratos!"})
    }
}

export const getDishe = async(req, res) => {
    const id = req.params.id;

    try {
        const getDisheById = await prisma.dishes.findUnique({
            where:{ id }
        })

        res.status(200).json(getDisheById);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Erro ao consultar dados de um prato!"})
    }
}

export const updateDishe = async(req, res) => {
    const id = req.params.id
    const { name, description, price, image, menuOption, restaurantId } = req.body;

    try {
        await prisma.dishes.update({
            where: { id },
            data: {
                name,
                description,
                price,
                image,
                menuOption,
                restaurantId
            }
        });
        
        res.status(200).json({message:"Prato atualizado com sucesso!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Erro ao atualizar prato"})
    }
}

export const deleteDishe = async(req, res) => {
    const id = req.params.id;
    
    try {
        await prisma.dishes.delete({
            where: { id }
        });

        res.status(200).json({message:"Prato deletado com sucesso!"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Erro ao deletar prato"})
    }
}