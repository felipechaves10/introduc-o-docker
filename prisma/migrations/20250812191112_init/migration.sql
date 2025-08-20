-- CreateTable
CREATE TABLE "public"."receitas" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ingrediete" TEXT NOT NULL,
    "preparo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "receitas_pkey" PRIMARY KEY ("id")
);
