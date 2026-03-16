require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || "Admin@2024!",
    10
  );

  await prisma.admin.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@moscleaning.ca" },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || "admin@moscleaning.ca",
      password: hashedPassword,
      name: "Mo Admin",
    },
  });

  console.log("✅ Admin user created");
  console.log("   Email:", process.env.ADMIN_EMAIL || "admin@moscleaning.ca");
  console.log("   Password:", process.env.ADMIN_PASSWORD || "Admin@2024!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
