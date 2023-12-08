import { faker } from '@faker-js/faker';

export const products = [...Array(10)].map((_, index) => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    category: faker.commerce.productMaterial(),
    unitCost: faker.commerce.price(),
    quantity: Math.floor(Math.random() * (40 - 10) + 10),
    material: faker.commerce.productMaterial(),
    isbn: faker.commerce.isbn()
  }));