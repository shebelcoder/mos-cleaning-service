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
      includes: JSON.stringify([
        "Kitchen cleaning (counters, stovetop, sink)",
        "Bathroom scrubbing and disinfecting",
        "Vacuuming all floors and carpets",
        "Mopping hard floors",
        "Dusting surfaces and furniture",
        "Emptying trash bins",
        "Making beds (linen change optional)",
      ]),
    },
    {
      name: "Commercial / Office Cleaning",
      description: "Professional cleaning for offices and commercial spaces, tailored to business needs.",
      basePrice: 180,
      includes: JSON.stringify([
        "Reception and common area cleaning",
        "Office desk and surface cleaning",
        "Boardroom and meeting room cleaning",
        "Kitchen and break room sanitizing",
        "Washroom cleaning and restocking",
        "Floor vacuuming and mopping",
        "Window sill and blind dusting",
      ]),
    },
    {
      name: "Move-In / Move-Out Cleaning",
      description: "Thorough top-to-bottom cleaning for properties during move-in or move-out.",
      basePrice: 200,
      includes: JSON.stringify([
        "Full kitchen deep clean including inside cabinets",
        "Oven, stove, and fridge cleaning",
        "All bathroom deep scrub",
        "All floors vacuumed and washed",
        "Windows cleaned (inside)",
        "Closets and storage areas wiped",
        "All baseboards and door frames",
      ]),
    },
    {
      name: "Deep Cleaning",
      description: "Intensive cleaning of every surface, corner, and hard-to-reach area in your home.",
      basePrice: 160,
      includes: JSON.stringify([
        "Everything in residential cleaning",
        "Inside cabinets and drawers",
        "Light fixtures and ceiling fans",
        "Door handles and switch plates",
        "Baseboards and trim",
        "Behind and under appliances",
        "Detailed bathroom scrub including grout",
      ]),
    },
    {
      name: "Post-Construction Cleaning",
      description: "Removal of dust, debris, and residue left after renovation or construction work.",
      basePrice: 250,
      includes: JSON.stringify([
        "Removal of construction dust and debris",
        "Window cleaning (inside and out)",
        "Cleaning all surfaces and fixtures",
        "Vacuuming and mopping all floors",
        "Bathroom and kitchen fixture cleaning",
        "Interior wall spot cleaning",
        "Final inspection walkthrough",
      ]),
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
