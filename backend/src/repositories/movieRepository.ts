import { prisma } from '../database/prismaClient';
import { subDays } from 'date-fns';

export const movieRepository = {
  async findAll() {
    const movies = await prisma.movie.findMany({
      include: {
        Rented: true,
      },
    });

    const currentDate = new Date();

    const moviesWithAvailability = movies.map(movie => {
      const rentedQuantity = movie.Rented.reduce((acc, rented) => {
        const rentedEndDate = new Date(rented.rentedAt);
        rentedEndDate.setDate(rentedEndDate.getDate() + rented.days);
        
        if (currentDate <= rentedEndDate) {
          return acc + 1;
        }
        return acc;
      }, 0);

      const availableQuantity = movie.quantity - rentedQuantity;

      return {
        id: movie.id,
        title: movie.title,
        quantity: availableQuantity,
      };
    });

    return moviesWithAvailability;
  }  
};
