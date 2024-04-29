import { FastifyRequest } from 'fastify';

export type HelloWorldRequest = FastifyRequest<{
  Querystring: {
    name?: string;
  };
}>;
