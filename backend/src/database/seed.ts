// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const movie1 = await prisma.movie.create({
    data: {
      title: 'Três homens em conflito',
      quantity: 3
    }
  });

  const movie2 = await prisma.movie.create({
    data: {
      title: 'Território Hostil',
      quantity: 1
    }
  });

  const movie3 = await prisma.movie.create({
    data: {
      title: 'Por um punhado de Dolares',
      quantity: 2
    }
  });

  const userAdm = await prisma.user.create({
    data: {
      name: 'admin',
      email: 'admin@dev.com',
      password: '123456',
      role: 'admin'
    }
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'locatario',
      email: 'locatario@dev.com',
      password: '123456',
      role: 'renter'
    }
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
