import prisma from "../lib/prisma.js";

export const getOrders = async(req, res) => {
    const id = req.params.id;

    try {
        const restaurantExists = await prisma.restaurant.findUnique({
            where: { id }
        });

        if(!restaurantExists) return res.status(404).json({message:"Restaurante não encontrado"});

        const orders = await prisma.orders.findMany({
            where: { restaurantId: id }
        });

        res.status(200).json(orders);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Falha ao consultar os dados dos pedidos"});
    }
}

export const createNewOrder = async(req, res) => {
    const id = req.params.id;
    const { userName, address, orderProductsName, orderProductsImage, orderProductsObservation, zipCode, orderValue, restaurantId, userId, status } = req.body;

    try {
        const restaurantExists = await prisma.restaurant.findUnique({
            where: { id }
        });

        if(!restaurantExists) return res.status(404).json({message:"Restaurante não encontrado"});

        const createOrder = await prisma.orders.create({
            data: {
                userName,
                address,
                orderProductsName,
                orderProductsImage,
                orderProductsObservation,
                zipCode,
                orderValue,
                restaurantId,
                status,
                userId
            }
        });

        res.status(200).json(createOrder);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Falha ao criar um novo pedido."});
    }
}

export const updateOrder = async(req, res) => {
    const id = req.params.id;
    const { status } = req.body;

    try {
        // const restaurantExists = await prisma.restaurant.findUnique({
        //     where: { id }
        // });

        // if(!restaurantExists) return res.status(404).json({message:"Restaurante não encontrado"});

        await prisma.orders.update({
            where: { id },
            data:{ status }
        });
        
        res.status(200).json({message:"Pedido atualizado com sucesso"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Falha ao consultar os dados dos pedidos"});
    }
}

export const deleteOrder = async(req, res) => {
    const id = req.params.id;
    
    try {
        await prisma.orders.delete({
            where: { id }
        });

        res.status(200).json({message:"Pedido deletado com sucesso!"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Erro ao deletar pedido"})
    }
}