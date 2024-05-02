import { FastifySchema } from 'fastify';

export const rootSchemas: { [schema: string]: FastifySchema } = {
  hello: {
    querystring: {
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
};
