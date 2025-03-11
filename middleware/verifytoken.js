import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    console.log('Token recebido no backend:', token);

    if (!token) return res.status(401).json({ message: "Not authenticated" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) {
            console.log('Erro ao verificar token:', err);
            return res.status(403).json({ message: "Token is not valid" });
        }

        console.log('Payload decodificado:', payload);

        req.userId = payload.id;
        req.params.userId = payload.id;

        next();
    });
};