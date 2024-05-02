import { FastifySchema } from 'fastify';

export const authSchemas: { [schema: string]: FastifySchema } = {
  login: {
    tags: ['auth'],
    body: {
      type: 'object',
      properties: {
        username: { type: 'string', minLength: 4 },
        password: { type: 'string', minLength: 4 },
      },
      required: ['username', 'password'],
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          token: { type: 'string' },
        },
      },
      401: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  register: {
    tags: ['auth'],
    body: {
      username: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
      first_name: { type: 'string' },
      last_name: { type: 'string' },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
      401: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
};
