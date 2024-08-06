import { FastifyRequest, FastifyReply } from 'fastify';
import { rentRepository } from '../repositories/rentRepository';
import { z } from 'zod';

export async function rentMovie(request: FastifyRequest, reply: FastifyReply) {

  try {

    const rentBodySchema = z.object({
      movieId: z.string(),
      days: z.number()
    });

    const { movieId, days } = rentBodySchema.parse(request.body);

    const userId = request.user?.id; // Ensure the user ID is retrieved from the token

    console.log(movieId, days, userId)

    if (!movieId || !days) {
      return reply.status(400).send({ error: 'MovieId and days are required' });
    }

    const rentedMovie = await rentRepository.rentMovie({ userId, movieId, days });

    return reply.status(201).send(rentedMovie);
  } catch (error: any) {
    return reply.status(500).send({ error: error.message });
  }
}
