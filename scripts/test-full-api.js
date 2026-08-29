const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function normalizeCategoryValue(value) {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim().toLocaleLowerCase();
}

async function testFullAPI() {
  try {
    const category = 'Factories for SALE';
    const subCategory = 'LABSA (SULPHONIC ACID) Factory _  (capacity to produce 3.5 ton / hr ) _ RUNNING';
    
    console.log('\n=== SIMULATING FULL API CALL ===');
    console.log('Category:', category);
    console.log('SubCategory:', subCategory);
    console.log('\n1. Fetching all products in category...');
    
    const products = await prisma.products.findMany({
      where: {
        category: category,
      },
      orderBy: { createdAt: "desc" },
    });

    console.log(`   Found ${products.length} products total`);
    
    console.log('\n2. Filtering for direct products (no supplier)...');
    const directProducts = products.filter((product) =>
      !product.supplierId &&
      product.subCategory &&
      normalizeCategoryValue(product.subCategory) === normalizeCategoryValue(subCategory)
    );
    
    console.log(`   Found ${directProducts.length} direct products`);
    
    if (directProducts.length > 0) {
      console.log('\n3. Direct Products:');
      directProducts.forEach((p, i) => {
        console.log(`\n   ${i+1}. ${p.title || p.name}`);
        console.log(`      supplierId: ${p.supplierId}`);
        console.log(`      subCategory: ${p.subCategory}`);
        console.log(`      subCategory (normalized): ${normalizeCategoryValue(p.subCategory)}`);
      });
    } else {
      console.log('\n❌ NO DIRECT PRODUCTS FOUND');
      console.log('\nDEBUG: All products in category:');
      products.forEach((p, i) => {
        console.log(`\n   ${i+1}. ${p.title || p.name}`);
        console.log(`      supplierId: ${p.supplierId} (type: ${typeof p.supplierId})`);
        console.log(`      !supplierId: ${!p.supplierId}`);
        console.log(`      subCategory: ${p.subCategory}`);
        if (p.subCategory) {
          console.log(`      normalized: ${normalizeCategoryValue(p.subCategory)}`);
          console.log(`      matches: ${normalizeCategoryValue(p.subCategory) === normalizeCategoryValue(subCategory)}`);
        }
      });
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testFullAPI();
