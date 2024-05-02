import { fastify } from 'fastify';
import { CONFIG } from './config';

export const server = fastify({
  logger: true,
});

/***************************\
 *           JWT           *
\***************************/

import jwt from '@fastify/jwt';

server.register(jwt, {
  secret: CONFIG.JWT_SECRET,
  sign: {
    expiresIn: '30d',
  },
});

/***************************\
 *         SWAGGER         *
\***************************/

import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import mongoose from 'mongoose';
import { UserModel } from './models';
import { ROUTES } from './routes';
import { JWTUser } from './types';

server.register(swagger, {
  openapi: {
    info: {
      title: 'Devman API',
      version: '0.1.0',
    },
    servers: [
      {
        url: `http://localhost:${CONFIG.PORT}`,
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
    let authorized = true;

    try {
      await req.jwtVerify();
    } catch (err) {
      res.status(401).send({ error: 'Unauthorized' });
      authorized = false;
    }

    if (!authorized) return;

    const { id } = req.user as JWTUser;
    const user = await UserModel.findById(id);

    if (!user?.active) {
      return res.status(401).send({ error: 'Unauthorized', message: 'User is not active' });
    }
  });

  Object.values(ROUTES.PRIVATE).forEach(route => {
    Object.values(route).forEach(({ path, method, schema, controller }) => {
      app.route({
        url: path,
        method,
        schema: { ...schema, security: [{ bearerAuth: [] }] },
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
  console.log('Connecting to mongo...');
  await mongoose.connect(
    `mongodb://${CONFIG.MONGO.USER}:${CONFIG.MONGO.PASSWORD}@${CONFIG.MONGO.HOST}:${CONFIG.MONGO.PORT}`
  );
  console.log('Connected to mongo');

  try {
    await server.listen({ port: CONFIG.PORT, host: '0.0.0.0' });
    await server.ready();
    server.swagger();
    console.log(`Server is running on port ${CONFIG.PORT}`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

start();
