const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function debug() {
  try {
    console.log('\n=== Debugging Products ===\n');
    
    // Check ALL products
    const allProducts = await prisma.products.findMany({
      select: {
        id: true,
        title: true,
        name: true,
        supplierId: true,
        category: true,
        subCategory: true,
      },
      take: 5,
      orderBy: { createdAt: 'desc' }
    });

    console.log(`Total products in database: ${allProducts.length}`);
    allProducts.forEach((p, i) => {
      console.log(`\n${i+1}. ${p.title || p.name || 'Untitled'}`);
      console.log(`   supplierId: ${p.supplierId}`);
      console.log(`   category: ${p.category}`);
      console.log(`   subCategory: ${p.subCategory}`);
    });

    // Check products without supplier
    console.log('\n\nQuerying products with supplierId: null...');
    const noSupplier = await prisma.products.findMany({
      where: { supplierId: null },
      select: {
        id: true,
        title: true,
        category: true,
        subCategory: true,
      }
    });

    console.log(`Products with supplierId=null: ${noSupplier.length}`);
    noSupplier.forEach(p => {
      console.log(`  - ${p.title} (${p.category} > ${p.subCategory})`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

debug();
