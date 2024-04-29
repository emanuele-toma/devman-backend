import { FastifySchema } from 'fastify';

export const rootSchemas = {
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
} as { [schema: string]: FastifySchema };
