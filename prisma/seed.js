const bcrypt = require("bcryptjs");
const prisma = require("../src/models/prisma");

const hashPassword = bcrypt.hashSync("123456", 10);

const user = [
  {
    username: "admin",
    password: hashPassword,
    role: "ADMIN",
  },
  {
    username: "nathan",
    password: hashPassword,
    role: "USER",
  },
  { username: "arthur", password: hashPassword, role: "USER" },
];

async function seedDatabase() {
  await prisma.user.createMany({
    data: user,
  });
}

seedDatabase()
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    prisma.$disconnect();
  });
