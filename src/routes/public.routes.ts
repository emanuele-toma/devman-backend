import { FastifySchema, HTTPMethods, RouteHandlerMethod } from 'fastify';
import { authControllers } from '../controllers/auth';
import { rootControllers } from '../controllers/root';
import { authSchemas, rootSchemas } from '../schemas';

export const PUBLIC = {
  root: {
    hello: {
      path: '/hello',
      method: 'GET',
      schema: rootSchemas.hello,
      controller: rootControllers.hello,
    },
  },
  auth: {
    login: {
      path: '/login',
      method: 'POST',
      schema: authSchemas.login,
      controller: authControllers.login,
    },
    register: {
      path: '/register',
      method: 'POST',
      schema: authSchemas.register,
      controller: authControllers.register,
    },
  },
} as { [route: string]: { [action: string]: Route } };

interface Route {
  path: string;
  method: HTTPMethods;
  schema: FastifySchema;
  controller: RouteHandlerMethod;
}
