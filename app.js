import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import authRoute from './routes/auth.route.js';
import restaurantRoute from './routes/restaurant.route.js';
import dishesRoute from './routes/dishes.route.js';
import ordersRoute from './routes/order.route.js';

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'x-next-revalidate-tags']
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/dishes", dishesRoute);
app.use("/api/orders", ordersRoute);

app.listen(8800, () => {
    console.log('Servidor rodando na porta 8800');
})