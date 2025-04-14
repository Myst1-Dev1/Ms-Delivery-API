// import express from 'express';
// import cookieParser from 'cookie-parser'
// import cors from 'cors';
// import authRoute from './routes/auth.route.js';
// import restaurantRoute from './routes/restaurant.route.js';
// import dishesRoute from './routes/dishes.route.js';
// import ordersRoute from './routes/order.route.js';
// import { Server } from "socket.io";
// import http from "http";

// const app = express();

// const server = http.createServer(app); // Se ainda não tiver isso
// const io = new Server(server, {
//     cors: {
//         origin: "*", // Ajuste se necessário
//     }
// });

// // Evento de conexão
// io.on("connection", (socket) => {
//     console.log("Novo cliente conectado:", socket.id);
// });

// app.set("io", io); // salva para reutilizar no controller

// server.listen(3001, () => console.log("Servidor rodando na porta 3001"));

// app.use(cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization', 'x-next-revalidate-tags']
// }));
// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/auth", authRoute);
// app.use("/api/restaurant", restaurantRoute);
// app.use("/api/dishes", dishesRoute);
// app.use("/api/orders", ordersRoute);

// app.listen(8800, () => {
//     console.log('Servidor rodando na porta 8800');
// })

import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import authRoute from './routes/auth.route.js';
import restaurantRoute from './routes/restaurant.route.js';
import dishesRoute from './routes/dishes.route.js';
import ordersRoute from './routes/order.route.js';
import userRoute from './routes/user.route.js';
import chatRoute from './routes/chat.route.js';
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || '*', // ajuste para seu domínio
    }
});

io.on("connection", (socket) => {
    console.log("Novo cliente conectado:", socket.id);
  
    // 👉 Entra na sala com base no orderId
    socket.on("join_room", (orderId) => {
      socket.join(orderId);
      console.log(`Socket ${socket.id} entrou na sala do pedido ${orderId}`);
    });
  
    // 👉 Recebe e envia mensagens
    socket.on("send_message", ({ orderId, sender, message }) => {
      const data = {
        sender,
        message,
        timestamp: new Date(),
      };
  
      // Envia a mensagem para todos na sala
      io.to(orderId).emit("receive_message", data);
  
      // 🔔 Notifica todos (exceto o remetente) que chegou mensagem nova
      socket.to(orderId).emit("new_notification", {
        orderId,
        from: sender,
      });
    });
  
    socket.on("disconnect", () => {
      console.log("Cliente desconectado:", socket.id);
    });
});

app.set("io", io);

app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'x-next-revalidate-tags']
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/dishes", dishesRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);

server.listen(8800, () => console.log("Servidor rodando na porta 8800"));