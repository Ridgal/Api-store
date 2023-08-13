import { faker } from "@faker-js/faker";
import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();

const createProduct = async (quantity: number) => {
  const products: Product[] = [];

  for (let i = 0; i < quantity; i++) {
    const productName = faker.commerce.productName();
    const categoryName = faker.commerce.department();

    const product = await prisma.product.create({
      data: {
        name: productName,
        slug: faker.helpers.slugify(productName).toLowerCase(),
        description: faker.commerce.productDescription(),
        price: +faker.commerce.price({ min: 10, max: 999, dec: 0 }),
        images: Array.from({length: faker.number.int({ min: 2, max: 6 })}).map(() =>
          faker.image.url()),
        category: {
          create: {
            name: categoryName,
            slug: faker.helpers.slugify(categoryName).toLowerCase()
          }
        },
        reviews: {
          create: [
            {
              user: {
                connect: { id: 1 }
              },
              rating: faker.number.int({ min: 1, max: 5 }),
              text: faker.lorem.paragraph()
            },
            {
              user: {
                connect: { id: 1 }
              },
              rating: faker.number.int({ min: 1, max: 5 }),
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