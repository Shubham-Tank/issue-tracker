/*
  Warnings:

  - Made the column `projectId` on table `Issue` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Issue" ALTER COLUMN "projectId" SET NOT NULL;
