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
    "upcomingCellsAt" DATETIME NOT NULL,
    "claimed" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("avatar", "cellsAvailable", "email", "id", "name", "role", "upcomingCellsAt") SELECT "avatar", "cellsAvailable", "email", "id", "name", "role", "upcomingCellsAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
