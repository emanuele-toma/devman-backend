import { FastifySchema, HTTPMethods, RouteHandlerMethod } from 'fastify';
import { rootControllers } from '../controllers/root';
import { rootSchemas } from '../schemas';

export const PRIVATE = {
  root: {
    hello: {
      path: '/hellox',
      method: 'GET',
      schema: rootSchemas.hello,
      controller: rootControllers.hello,
    },
  },
} as { [route: string]: { [action: string]: Route } };

interface Route {
  path: string;
  method: HTTPMethods;
  schema: FastifySchema;
  controller: RouteHandlerMethod;
}
