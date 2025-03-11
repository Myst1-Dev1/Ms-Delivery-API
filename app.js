import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import authRoute from './routes/auth.route.js';

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);

app.listen(8800, () => {
    console.log('Servidor rodando na porta 8800');
})