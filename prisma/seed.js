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

const car = [
  {
    brand: "Bmw",
    model: "serie 5",
    price: "1250000",
    year: "2020",
    color: "white",
    mileage: "50000",
    fuelType: "เบนซิน",
    transmission: "ออโต้",
    driveTrain: "rwd",
    seat: "5",
    location: "Bangkok",
    description: "bmw serie5 g30 เครื่องเบนซิน  twinpower 2.0l",
    reservePrice: "8000",
  },
  {
    brand: "mini",
    model: "coopers",
    price: "980000",
    year: "2018",
    color: "red",
    mileage: "80000",
    fuelType: "gasoline",
    transmission: "auto",
    driveTrain: "fwd",
    seat: "5",
    location: "Bangkok",
    description: "mini-countryman",
    reservePrice: "4500",
  },
  {
    brand: "toyota",
    model: "yaris eco",
    price: "120000",
    year: "2020",
    color: "white",
    mileage: "20000",
    fuelType: "gasoline",
    transmission: "auto",
    driveTrain: "fwd",
    seat: "5",
    location: "lopburi",
    description: "ไมล์แท้ 6พัน 1.2 SPORT HATCHBACK ออกศูนย์",
    reservePrice: "5000",
  },
];

const imagecar = [
  {
    image:
      "https://res.cloudinary.com/dhr78bot3/image/upload/v1706864265/ofpetybytyfza3ggutly.jpg",
    carId: 1,
  },
  {
    image:
      "https://res.cloudinary.com/dhr78bot3/image/upload/v1706864265/sapix2mlievcprvo5slg.jpg",
    carId: 1,
  },
  {
    image:
      "https://res.cloudinary.com/dhr78bot3/image/upload/v1706864265/bl6sxlbkpa3o9bhkamtb.jpg",
    carId: 1,
  },
  {
    image:
      "https://res.cloudinary.com/dhr78bot3/image/upload/v1706864265/wfgezzdw6r0v3wdch0h8.jpg",
    carId: 1,
  },
  {
    image:
      "https://res.cloudinary.com/dhr78bot3/image/upload/v1706864265/ahz9d1pl7grgaz2ivxbe.jpg",
    carId: 1,
  },
  {
    image:
      "https://res.cloudinary.com/dhr78bot3/image/upload/v1706864757/d8adozl09o7xyfj6x9qv.jpg",
    carId: 2,
  },
  {
    image:
      "https://res.cloudinary.com/dhr78bot3/image/upload/v1706864766/uqlgsrzoi4rcut4gc9ow.jpg",
    carId: 2,
  },
  {
    image:
      "https://res.cloudinary.com/dhr78bot3/image/upload/v1706864767/bbzr0i2ymodrfnezf0p1.jpg",
    carId: 2,
  },
  {
    image:
      "https://res.cloudinary.com/dhr78bot3/image/upload/v1706864767/mxnpecv7sxnljiwexopm.jpg",
    carId: 2,
  },
  {
    image:
      "https://res.cloudinary.com/dhr78bot3/image/upload/v1706864767/ylwi0uc424hmm3haksns.jpg",
    carId: 2,
  },
  {
    image:
      "https://res.cloudinary.com/dhr78bot3/image/upload/v1707104054/g3qqoy6tvsrz3jtiwysf.jpg",
    carId: 3,
  },
  {
    image:
      "https://res.cloudinary.com/dhr78bot3/image/upload/v1707104055/kpgf9rfdurea7xalbqg7.jpg",
    carId: 3,
  },
  {
    image:
      "https://res.cloudinary.com/dhr78bot3/image/upload/v1707104057/gdtptcrtzkeg10v4pzwb.jpg",
    carId: 3,
  },
  {
    image:
      "https://res.cloudinary.com/dhr78bot3/image/upload/v1707104059/qhy3hdzkyl8sp4jvybbs.jpg",
    carId: 3,
  },
  {
    image:
      "https://res.cloudinary.com/dhr78bot3/image/upload/v1707104061/mg9p4cchq8smjthritvu.jpg",
    carId: 3,
  },
];

async function seedDatabase() {
  await prisma.user.createMany({
    data: user,
  });
  await prisma.car.createMany({
    data: car,
  });
  await prisma.imageCar.createMany({
    data: imagecar,
  });
}

seedDatabase()
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    prisma.$disconnect();
  });
