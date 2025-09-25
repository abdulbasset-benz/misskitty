-- CreateTable
CREATE TABLE "public"."City" (
    "id" SERIAL NOT NULL,
    "commune_name" TEXT NOT NULL,
    "commune_name_ascii" TEXT NOT NULL,
    "daira_name" TEXT NOT NULL,
    "daira_name_ascii" TEXT NOT NULL,
    "wilaya_code" TEXT NOT NULL,
    "wilaya_name" TEXT NOT NULL,
    "wilaya_name_ascii" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);
