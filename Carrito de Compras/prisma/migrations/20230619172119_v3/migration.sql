-- CreateTable
CREATE TABLE "Product" (
    "idProduct" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Cart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("idProduct") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
