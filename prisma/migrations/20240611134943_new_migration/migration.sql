/*
  Warnings:

  - The values [DESCONECTED,CONECTED] on the enum `MACHINE_STATUS` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `connection` to the `Machines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timer_ended_at` to the `Sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timer_started_at` to the `Sessions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MACHINE_CONNECTION" AS ENUM ('DISCONECTED', 'CONECTED');

-- AlterEnum
BEGIN;
CREATE TYPE "MACHINE_STATUS_new" AS ENUM ('RUNNING', 'STOPED');
ALTER TABLE "Machines" ALTER COLUMN "status" TYPE "MACHINE_STATUS_new" USING ("status"::text::"MACHINE_STATUS_new");
ALTER TYPE "MACHINE_STATUS" RENAME TO "MACHINE_STATUS_old";
ALTER TYPE "MACHINE_STATUS_new" RENAME TO "MACHINE_STATUS";
DROP TYPE "MACHINE_STATUS_old";
COMMIT;

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "METHOD_PAYMENT" ADD VALUE 'DEBITO';
ALTER TYPE "METHOD_PAYMENT" ADD VALUE 'LOCAL';

-- AlterTable
ALTER TABLE "Machines" ADD COLUMN     "connection" "MACHINE_CONNECTION" NOT NULL;

-- AlterTable
ALTER TABLE "Sessions" ADD COLUMN     "timer_ended_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "timer_started_at" TIMESTAMP(3) NOT NULL;
