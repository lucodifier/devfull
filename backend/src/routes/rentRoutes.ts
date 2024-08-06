import { FastifyInstance } from 'fastify';
import { rentMovie } from '../controllers/rentController';
import { verifyJWT } from '../services/authService';

export default async function rentRoutes(fastify: FastifyInstance) {
  fastify.post('/rentMovie', { preHandler: [verifyJWT] }, rentMovie);
}
