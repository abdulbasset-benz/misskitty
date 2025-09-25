-- CreateTable
CREATE TABLE "public"."Wilaya" (
    "id" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameAr" TEXT NOT NULL,

    CONSTRAINT "Wilaya_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Daira" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nameAr" TEXT NOT NULL,
    "wilayaId" INTEGER NOT NULL,

    CONSTRAINT "Daira_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Commune" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "nameAr" TEXT NOT NULL,
    "dairaId" INTEGER NOT NULL,

    CONSTRAINT "Commune_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Daira" ADD CONSTRAINT "Daira_wilayaId_fkey" FOREIGN KEY ("wilayaId") REFERENCES "public"."Wilaya"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Commune" ADD CONSTRAINT "Commune_dairaId_fkey" FOREIGN KEY ("dairaId") REFERENCES "public"."Daira"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
