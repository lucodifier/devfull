import { FastifyReply, FastifyRequest } from 'fastify';
import { movieRepository } from '../repositories/movieRepository';

export async function getAllMovies(req: FastifyRequest, reply: FastifyReply) {
  const movies = await movieRepository.findAll();
  reply.send(movies);
};
