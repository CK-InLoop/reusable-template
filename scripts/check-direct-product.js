const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const product = await prisma.products.findFirst({
    where: { title: 'ijuygubhjn' }
  });
  
  if (!product) {
    console.log('Product not found!');
    await prisma.$disconnect();
    return;
  }
  
  console.log('\nDirect product (ijuygubhjn):');
  console.log(JSON.stringify(product, null, 2));
  
  console.log('\n\nsupplierId analysis:');
  console.log('Value:', product.supplierId);
  console.log('Type:', typeof product.supplierId);
  console.log('Is null:', product.supplierId === null);
  console.log('Is undefined:', product.supplierId === undefined);
  
  await prisma.$disconnect();
}

check();
