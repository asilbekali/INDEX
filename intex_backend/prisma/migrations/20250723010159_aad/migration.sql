-- CreateEnum
CREATE TYPE "checked" AS ENUM ('active', 'NoActive');

-- AlterTable
ALTER TABLE "consultation" ADD COLUMN     "status" "checked" NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "status" "checked" NOT NULL DEFAULT 'active';
