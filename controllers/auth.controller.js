import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from '../lib/prisma.js';

export const register = async (req, res) => {
    const { name, email, password, address, zipCode, isAdmin } = req.body

    const hashedPassword  = await bcrypt.hash(password, 10);

    try {
        const newUser = await prisma.user.create({
            data: {
                name, email, password: hashedPassword, address, zipCode, isAdmin
            }
        });

        console.log(newUser);

        res.status(200).json({message:"Usuário criado com sucesso!"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Falha ao fazer cadastro!"})
    }
}

// export const registerRestaurant = async (req, res) => {
//     const { name, email, password, isAdmin } = req.body

//     const hashedPassword  = await bcrypt.hash(password, 10);

//     try {
//         const newRestaurantAccount = await prisma.user.create({
//             data: {
//                 name, email, password: hashedPassword, isAdmin
//             }
//         });

//         console.log(newRestaurantAccount);

//         res.status(200).json({message:"Usuário criado com sucesso!"});
        
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message:"Falha ao fazer cadastro!"})
//     }
// }

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(400).json({ message: "Credenciais inválidas!" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Credenciais inválidas!" });
        }

        const age = 1000 * 60 * 60 * 24 * 7;

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: age }
        );

        const { password: userPassword, ...userInfo } = user;

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None', 
            maxAge: age,
        }).status(200).json(userInfo);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Falha ao fazer login!" });
    }
};

export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({message: "Logout com sucesso!"});  
}