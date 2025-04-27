import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminEmails = process.env.ADMIN_EMAILS;
  if (!adminEmails) {
    console.error("No admin emails provided. Set ADMIN_EMAILS in .env");
    return;
  }
  const emails = adminEmails.split(",").map((email) => ({ email: email.trim() }));
  await prisma.adminEmail.createMany({
    data: emails,
  });
  console.log("Admin emails seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
