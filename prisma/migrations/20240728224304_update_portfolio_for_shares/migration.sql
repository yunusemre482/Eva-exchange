-- AlterTable
ALTER TABLE "Share" ADD COLUMN     "portfolioId" TEXT;

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "Share_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE SET NULL ON UPDATE CASCADE;
