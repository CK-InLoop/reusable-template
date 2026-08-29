const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkNullType() {
  try {
    const product = await prisma.products.findFirst({
      where: { title: 'ijuygubhjn' }
    });

    console.log('\nProduct supplierId value:');
    console.log('  Value:', product.supplierId);
    console.log('  Type:', typeof product.supplierId);
    console.log('  === null:', product.supplierId === null);
    console.log('  === undefined:', product.supplierId === undefined);
    console.log('  === "null":', product.supplierId === 'null');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkNullType();
