const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const product = await prisma.products.findFirst();
  console.log('\nRaw product object:');
  console.log(JSON.stringify(product, null, 2));
  
  console.log('\n\nsupplierId inspection:');
  console.log('Value:', product.supplierId);
  console.log('Type:', typeof product.supplierId);
  console.log('Is null:', product.supplierId === null);
  console.log('Is undefined:', product.supplierId === undefined);
  console.log('Stringified:', JSON.stringify(product.supplierId));
  
  await prisma.$disconnect();
}

check();
