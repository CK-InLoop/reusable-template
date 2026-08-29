const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testGetDirectProducts() {
  try {
    console.log('\n=== Testing getDirectProducts function ===\n');
    
    const category = 'Factories for SALE';
    const subCategory = 'LABSA (SULPHONIC ACID) Factory _  (capacity to produce 3.5 ton / hr ) _ RUNNING';
    
    console.log('Fetching with:');
    console.log(`  Category: ${category}`);
    console.log(`  SubCategory: ${subCategory}\n`);
    
    // Simulate what the API does
    const products = await prisma.products.findMany({
      where: {
        supplierId: null,
        category: category,
      },
      orderBy: { createdAt: "desc" },
    });

    console.log(`Found ${products.length} products with supplierId=null and category="${category}"`);
    
    // Now filter by subcategory (with normalization)
    function normalizeCategoryValue(value) {
      return value.normalize("NFKC").replace(/\s+/g, " ").trim().toLocaleLowerCase();
    }
    
    const filtered = products.filter((product) =>
      product.subCategory &&
      normalizeCategoryValue(product.subCategory) === normalizeCategoryValue(subCategory)
    );
    
    console.log(`After subcategory filter: ${filtered.length} products\n`);
    
    if (filtered.length > 0) {
      filtered.forEach(p => {
        console.log(`✓ ${p.title || p.name}`);
        console.log(`  ID: ${p.id}`);
        console.log(`  SubCategory (raw): "${p.subCategory}"`);
        console.log(`  SubCategory (normalized): "${normalizeCategoryValue(p.subCategory)}"`);
        console.log(`  Match target (normalized): "${normalizeCategoryValue(subCategory)}"`);
        console.log('');
      });
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testGetDirectProducts();
