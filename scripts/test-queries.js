const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testQueries() {
  try {
    console.log('\n=== Testing Different Query Approaches ===\n');
    
    // Test 1: No where clause
    console.log('1. All products:');
    const all = await prisma.products.findMany({ take: 5 });
    console.log(`   Found: ${all.length}`);
    
    // Test 2: WHERE supplierId IS NULL
    console.log('\n2. WHERE supplierId: null');
    const test2 = await prisma.products.findMany({
      where: { supplierId: null },
      take: 5
    });
    console.log(`   Found: ${test2.length}`);
    
    // Test 3: WHERE NOT exists supplierId
    console.log('\n3. WHERE NOT supplierId (exists)');
    const test3 = await prisma.products.findMany({
      where: { NOT: { supplierId: { not: null } } },
      take: 5
    });
    console.log(`   Found: ${test3.length}`);
    
    // Test 4: Get all and filter in JS
    console.log('\n4. Filter in JavaScript');
    const allProducts = await prisma.products.findMany({ take: 10 });
    const filtered = allProducts.filter(p => p.supplierId === null);
    console.log(`   Found: ${filtered.length}`);
    if (filtered.length > 0) {
      console.log(`   Example: ${filtered[0].title}`);
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testQueries();
