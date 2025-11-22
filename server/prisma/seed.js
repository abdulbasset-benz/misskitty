import bcrypt from "bcrypt";
import dotenv from "dotenv";
import prisma from "../src/db/prisma.js";

dotenv.config();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error("⚠️ ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
    },
  });

  console.log("✅ Admin seeded:", admin.email);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });