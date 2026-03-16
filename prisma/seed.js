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

  const services = [
    {
      name: "Residential Cleaning",
      description: "Regular home cleaning covering all rooms, kitchen, bathrooms, and common areas.",
      basePrice: 120,
    },
    {
      name: "Commercial / Office Cleaning",
      description: "Professional cleaning for offices and commercial spaces, tailored to business needs.",
      basePrice: 180,
    },
    {
      name: "Move-In / Move-Out Cleaning",
      description: "Thorough top-to-bottom cleaning for properties during move-in or move-out.",
      basePrice: 200,
    },
    {
      name: "Deep Cleaning",
      description: "Intensive cleaning of every surface, corner, and hard-to-reach area in your home.",
      basePrice: 160,
    },
    {
      name: "Post-Construction Cleaning",
      description: "Removal of dust, debris, and residue left after renovation or construction work.",
      basePrice: 250,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { name: service.name },
      update: { description: service.description, basePrice: service.basePrice },
      create: service,
    });
  }
  console.log("✅ Services seeded");

  await prisma.$disconnect();
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
