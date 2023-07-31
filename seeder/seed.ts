import { faker } from "@faker-js/faker";
import { PrismaClient, Product } from "@prisma/client";
// import { generateSlug } from "src/_utils/helpers/generate-slug";
// import { getRandomNumber } from "src/_utils/helpers/ramdom-number";

const prisma = new PrismaClient();

const createProduct = async (quantity: number) => {
  const products: Product[] = [];

  for (let i = 0; i < quantity; i++) {
    const productName = faker.commerce.productName();
    const categoryName = faker.commerce.department();

    const product = await prisma.product.create({
      data: {
        name: productName,
        slug: faker.helpers.slugify(productName),
        description: faker.commerce.productDescription(),
        price: +faker.commerce.price(10, 999, 0),
        images: Array.from({length: faker.datatype.number({ min: 2, max: 6 })}).map(() =>
          faker.image.imageUrl()),
        category: {
          create: {
            name: categoryName,
            slug: faker.helpers.slugify(categoryName)
          }
        },
        reviews: {
          create: [
            {
              user: {
                connect: { id: 2 }
              },
              rating: faker.datatype.number({ min: 1, max: 5 }),
              text: faker.lorem.paragraph()
            },
            {
              user: {
                connect: { id: 2 }
              },
              rating: faker.datatype.number({ min: 1, max: 5 }),
              text: faker.lorem.paragraph()
            },
          ]
        }
      }
    })
    products.push(product);
  }
  console.log(`Created ${products.length} products`)
};

async function main() {
  console.log('Start seeding ...')
  await createProduct(10)
};

main()
  .catch(error => console.error(error))
  .finally(async () => {
    await prisma.$disconnect()
  });