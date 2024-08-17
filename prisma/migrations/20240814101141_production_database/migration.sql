-- CreateEnum
CREATE TYPE "SESSION_STATUS" AS ENUM ('RUNNING', 'PAUSED');

-- CreateEnum
CREATE TYPE "TRANSACTION_TYPE" AS ENUM ('PRODUCT', 'MACHINE_CREDIT', 'SPLIT');

-- CreateEnum
CREATE TYPE "METHOD_PAYMENT" AS ENUM ('DEBITO', 'CREDITO', 'PIX', 'LOCAL');

-- CreateEnum
CREATE TYPE "STATUS_PAYMENT" AS ENUM ('APPROVED', 'PENDENT', 'CANCEL');

-- CreateEnum
CREATE TYPE "MACHINE_CONNECTION" AS ENUM ('DISCONECTED', 'CONECTED');

-- CreateEnum
CREATE TYPE "MACHINE_STATUS" AS ENUM ('RUNNING', 'STOPED');

-- CreateTable
CREATE TABLE "UserAdm" (
    "id" TEXT NOT NULL,
    "saldo" DOUBLE PRECISION NOT NULL,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAdm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserColab" (
    "id" TEXT NOT NULL,
    "saldo" DOUBLE PRECISION NOT NULL,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserColab_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserClient" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "saldo" DOUBLE PRECISION NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "administrator_id" TEXT NOT NULL,
    "isPlaying" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserClient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArenaLocal" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "end_url_google" TEXT NOT NULL,
    "userAdmId" TEXT NOT NULL,
    "userColabId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArenaLocal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sessions" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "duration" INTEGER NOT NULL,
    "timer_started_at" TIMESTAMP(3) NOT NULL,
    "timer_ended_at" TIMESTAMP(3) NOT NULL,
    "status" "SESSION_STATUS" NOT NULL,
    "adm_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "local_id" TEXT NOT NULL,
    "machine_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url_img" TEXT NOT NULL,
    "available" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "local_id" TEXT,
    "session_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "transaction_type" "TRANSACTION_TYPE" NOT NULL,
    "product_description" TEXT,
    "method" "METHOD_PAYMENT" NOT NULL,
    "status" "STATUS_PAYMENT" NOT NULL,
    "userAdmId" TEXT,
    "userClientId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Machines" (
    "id" TEXT NOT NULL,
    "nano_id" TEXT NOT NULL,
    "connection" "MACHINE_CONNECTION" NOT NULL,
    "status" "MACHINE_STATUS" NOT NULL,
    "userAdmId" TEXT NOT NULL,
    "userColabId" TEXT,
    "arenaLocalId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Machines_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAdm_email_key" ON "UserAdm"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserColab_email_key" ON "UserColab"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ArenaLocal_userColabId_key" ON "ArenaLocal"("userColabId");

-- AddForeignKey
ALTER TABLE "UserClient" ADD CONSTRAINT "UserClient_administrator_id_fkey" FOREIGN KEY ("administrator_id") REFERENCES "UserAdm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArenaLocal" ADD CONSTRAINT "ArenaLocal_userAdmId_fkey" FOREIGN KEY ("userAdmId") REFERENCES "UserAdm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArenaLocal" ADD CONSTRAINT "ArenaLocal_userColabId_fkey" FOREIGN KEY ("userColabId") REFERENCES "UserColab"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_adm_id_fkey" FOREIGN KEY ("adm_id") REFERENCES "UserAdm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "UserClient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_local_id_fkey" FOREIGN KEY ("local_id") REFERENCES "ArenaLocal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_machine_id_fkey" FOREIGN KEY ("machine_id") REFERENCES "Machines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_local_id_fkey" FOREIGN KEY ("local_id") REFERENCES "ArenaLocal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_userAdmId_fkey" FOREIGN KEY ("userAdmId") REFERENCES "UserAdm"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_userClientId_fkey" FOREIGN KEY ("userClientId") REFERENCES "UserClient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Machines" ADD CONSTRAINT "Machines_userAdmId_fkey" FOREIGN KEY ("userAdmId") REFERENCES "UserAdm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Machines" ADD CONSTRAINT "Machines_userColabId_fkey" FOREIGN KEY ("userColabId") REFERENCES "UserColab"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Machines" ADD CONSTRAINT "Machines_arenaLocalId_fkey" FOREIGN KEY ("arenaLocalId") REFERENCES "ArenaLocal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
