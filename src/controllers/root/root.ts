import { FastifyReply } from 'fastify';
import { HelloWorldRequest } from './types';

export const rootControllers = {
  hello: async (req: HelloWorldRequest, _res: FastifyReply) => {
    const { name } = req.query;
    return { message: `Hello ${name || 'world'}!` };
  },
};
