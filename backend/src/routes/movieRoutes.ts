import { FastifyInstance } from 'fastify';
import { getAllMovies } from '../controllers/movieController';
import { verifyJWT } from '../services/authService';

export default async function movieRoutes(fastify: FastifyInstance) {
  fastify.get('/movies', { preHandler: verifyJWT }, getAllMovies);
}