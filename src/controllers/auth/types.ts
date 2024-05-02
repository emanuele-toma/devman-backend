import { FastifyRequest } from 'fastify';

export type LoginRequest = FastifyRequest<{
  Body: {
    username: string;
    password: string;
  };
}>;

export type RegisterRequest = FastifyRequest<{
  Body: {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  };
}>;
