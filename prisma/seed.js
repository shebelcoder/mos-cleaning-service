require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

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
  await prisma.$disconnect();
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
