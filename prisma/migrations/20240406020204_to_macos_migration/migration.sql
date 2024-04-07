/*
  Warnings:

  - You are about to drop the column `proprietario_id` on the `UserClient` table. All the data in the column will be lost.
  - Added the required column `status` to the `Machines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `administrator_id` to the `UserClient` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MACHINE_STATUS" AS ENUM ('DESCONECTED', 'CONECTED');

-- AlterTable
ALTER TABLE "Machines" ADD COLUMN     "status" "MACHINE_STATUS" NOT NULL;

-- AlterTable
ALTER TABLE "UserClient" DROP COLUMN "proprietario_id",
ADD COLUMN     "administrator_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UserClient" ADD CONSTRAINT "UserClient_administrator_id_fkey" FOREIGN KEY ("administrator_id") REFERENCES "UserAdm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
