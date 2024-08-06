import { prisma } from '../database/prismaClient';
import { subDays, isBefore } from 'date-fns';
import { IRentMovieData } from '../interfaces/IRentInterfaces';

export const rentRepository = {
  async rentMovie(data: IRentMovieData) {
    const { movieId, userId, days } = data;

    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!movie) {
      throw new Error('Filme não encontrado');
    }

    const rentedMovies = await prisma.rented.findMany({
      where: { movieId },
    });

    const validRentals = rentedMovies.filter(rental => {
      const rentalEndDate = subDays(new Date(rental.rentedAt), -rental.days);
      return isBefore(new Date(), rentalEndDate);
    });

    const rentedCount = validRentals.length;

    if (rentedCount >= movie.quantity) {
      throw new Error('Filme não disponível para aluguel');
    }

    await prisma.rented.create({
      data: {
        days,
        userId,
        movieId,
      },
    });

    return { message: 'Filme alugado com sucesso' };
  },
};
