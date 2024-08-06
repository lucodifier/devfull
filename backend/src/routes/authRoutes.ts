import { FastifyInstance } from 'fastify';
import { login } from '../controllers/authController';

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/login', login)
}