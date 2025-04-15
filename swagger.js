import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MS Delivery API',
      version: '1.0.0',
      description: 'Documentação da API de pedidos. Aqui você pode criar uma conta de usuário ou restaurante. Restaurantes têm acesso a um painel completo para gerenciar seus produtos e vendas. Esta API também inclui um sistema de chat integrado, permitindo a comunicação entre cliente e restaurante em caso de dúvidas ou problemas com pedidos.',
    },
    servers: [
      {
        url: 'https://ms-delivery-api.onrender.com',
      },
    ],
  },
  apis: ['./routes/*.js'], // ou onde estão suas rotas
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}