import { fastify } from 'fastify';

const server = fastify({
  logger: true,
});

/***************************\
 *           JWT           *
\***************************/

import jwt from '@fastify/jwt';

server.register(jwt, {
  secret: 'supersecret',
});

/***************************\
 *         SWAGGER         *
\***************************/

import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { ROUTES } from './routes';

server.register(swagger, {
  openapi: {
    info: {
      title: 'Fastify API',
      version: '0.1.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
        },
      },
    },
  },
});

server.register(swaggerUi, {
  routePrefix: '/docs',
});

/***************************\
 *          ROUTES         *
\***************************/

server.register((app, _opt, done) => {
  Object.values(ROUTES.PUBLIC).forEach(route => {
    Object.values(route).forEach(({ path, method, schema, controller }) => {
      app.route({
        url: path,
        method,
        schema,
        handler: controller,
      });
    });
  });
  done();
});

server.register((app, _opt, done) => {
  app.addHook('onRequest', async (req, res) => {
    try {
      await req.jwtVerify();
    } catch (err) {
      res.status(401).send({ error: 'Unauthorized' });
    }
  });

  Object.values(ROUTES.PRIVATE).forEach(route => {
    Object.values(route).forEach(({ path, method, schema, controller }) => {
      app.route({
        url: path,
        method,
        schema,
        handler: controller,
      });
    });
  });

  done();
});

/***************************\
 *         START           *
\***************************/

const start = async () => {
  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });
    await server.ready();
    server.swagger();
    console.log('Server is running on port 3000');
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

start();
