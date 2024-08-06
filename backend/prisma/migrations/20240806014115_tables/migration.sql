-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "movies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1
);

-- CreateTable
CREATE TABLE "rented" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "days" INTEGER NOT NULL,
    "rentedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    CONSTRAINT "rented_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "rented_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
