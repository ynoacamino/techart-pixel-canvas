/*
  Warnings:

  - You are about to drop the column `lastGivenAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `upcomingCellsAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'auth',
    "cellsAvailable" INTEGER NOT NULL,
    "upcomingCellsAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("avatar", "cellsAvailable", "email", "id", "name", "role") SELECT "avatar", "cellsAvailable", "email", "id", "name", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
