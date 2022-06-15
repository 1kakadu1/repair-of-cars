-- CreateTable
CREATE TABLE "CarModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Seasons" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Conditions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Manufacturers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "SpeedIndex" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "updatedAt" DATETIME,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "FuelEfficiency" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "updatedAt" DATETIME,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "GripSurfaces" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "updatedAt" DATETIME,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "preview" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "isProduct" BOOLEAN NOT NULL DEFAULT false,
    "isServices" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" DATETIME,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT '',
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" DATETIME,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "productId" TEXT NOT NULL,
    CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comments_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CommentsNews" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "newsId" TEXT NOT NULL,
    CONSTRAINT "CommentsNews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CommentsNews_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductCategory" (
    "categoryId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    PRIMARY KEY ("categoryId", "productId"),
    CONSTRAINT "ProductCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductCategory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ServicesCategory" (
    "categoryId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    PRIMARY KEY ("categoryId", "serviceId"),
    CONSTRAINT "ServicesCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ServicesCategory_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Services" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NewsCategory" (
    "categoryId" TEXT NOT NULL,
    "newsId" TEXT NOT NULL,

    PRIMARY KEY ("categoryId", "newsId"),
    CONSTRAINT "NewsCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "NewsCategory_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "modeCarlId" INTEGER NOT NULL DEFAULT 1,
    "userId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "rating" REAL NOT NULL DEFAULT 0,
    "conditionId" INTEGER NOT NULL DEFAULT 1,
    "seasonId" INTEGER NOT NULL DEFAULT 1,
    "manufacturersId" INTEGER NOT NULL DEFAULT 1,
    "speedIndexId" INTEGER NOT NULL DEFAULT 1,
    "fuelEfficiencyId" INTEGER NOT NULL DEFAULT 1,
    "gripSurfacesId" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "preview" TEXT NOT NULL DEFAULT '',
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "loadIndex" INTEGER NOT NULL DEFAULT 0,
    "externalNoiseLevel" INTEGER NOT NULL DEFAULT 0,
    "completeSet" BOOLEAN NOT NULL DEFAULT false,
    "isStock" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Product_modeCarlId_fkey" FOREIGN KEY ("modeCarlId") REFERENCES "CarModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Seasons" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_conditionId_fkey" FOREIGN KEY ("conditionId") REFERENCES "Conditions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_manufacturersId_fkey" FOREIGN KEY ("manufacturersId") REFERENCES "Manufacturers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_speedIndexId_fkey" FOREIGN KEY ("speedIndexId") REFERENCES "SpeedIndex" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_fuelEfficiencyId_fkey" FOREIGN KEY ("fuelEfficiencyId") REFERENCES "FuelEfficiency" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_gripSurfacesId_fkey" FOREIGN KEY ("gripSurfacesId") REFERENCES "GripSurfaces" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Services" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "preview" TEXT NOT NULL DEFAULT '',
    "previewFull" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "price" REAL NOT NULL DEFAULT 0,
    "workDesc" TEXT NOT NULL DEFAULT 'Работаем с 9.00 - 20.00 без выходных',
    "slug" TEXT NOT NULL,
    CONSTRAINT "Services_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "preview" TEXT NOT NULL DEFAULT '',
    "previewFull" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "isStock" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "validUntil" DATETIME,
    "tags" TEXT,
    CONSTRAINT "News_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "products" TEXT NOT NULL,
    CONSTRAINT "Orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_slug_key" ON "Category"("name", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_post_id_unique" ON "Comments"("userId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_newsId_unique" ON "CommentsNews"("userId", "newsId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_name_code_key" ON "Product"("id", "name", "code");

-- CreateIndex
CREATE UNIQUE INDEX "Services_id_title_key" ON "Services"("id", "title");

-- CreateIndex
CREATE UNIQUE INDEX "News_id_title_key" ON "News"("id", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_id_key" ON "Orders"("id");
