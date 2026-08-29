import { PrismaClient } from "@prisma/client";
import { toWhatsAppContact, WHATSAPP_SETTING_KEY } from "@/lib/whatsapp";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

function normalizeCategoryValue(value: string) {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim().toLocaleLowerCase();
}

// Re-export User type from Prisma
export type { User } from "@prisma/client";

export const db = {
  // User operations
  async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  },

  async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
    });
  },

  async getUserByVerificationToken(token: string) {
    return await prisma.user.findFirst({
      where: {
        emailVerificationToken: token,
        emailVerificationExpires: {
          gt: new Date(),
        },
      },
    });
  },

  async getWhatsAppContact() {
    try {
      const setting = await prisma.systemSetting.findUnique({
        where: { key: WHATSAPP_SETTING_KEY },
      });
      return toWhatsAppContact(setting?.value);
    } catch (error) {
      console.error('Failed to load WhatsApp contact setting:', error);
      return toWhatsAppContact(null);
    }
  },

  async getUserByPasswordResetToken(token: string) {
    return await prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpires: { gt: new Date() },
      },
    });
  },

  async createUser(data: {
    id: string;
    email: string;
    password: string;
    name?: string;
    emailVerificationToken: string;
    emailVerificationExpires: number;
  }) {
    return await prisma.user.create({
      data: {
        id: data.id,
        email: data.email,
        password: data.password,
        name: data.name || null,
        role: 'user',
        emailVerified: false,
        emailVerificationToken: data.emailVerificationToken,
        emailVerificationExpires: new Date(data.emailVerificationExpires),
      },
    });
  },

  async updateUser(id: string, data: any) {
    // Convert numeric timestamps to Dates if necessary
    const updateData = { ...data };
    if (data.emailVerificationExpires && typeof data.emailVerificationExpires === 'number') {
      updateData.emailVerificationExpires = new Date(data.emailVerificationExpires);
    }
    if (data.emailVerified !== undefined) {
      updateData.emailVerified = Boolean(data.emailVerified);
    }

    return await prisma.user.update({
      where: { id },
      data: updateData,
    });
  },

  async getSuppliers(filters?: { category?: string; subCategory?: string }) {
    const where: Record<string, unknown> = {};
    // Category values come from the database-backed sidebar.
    if (filters?.category) {
      where.category = filters.category;
    }

    const suppliers = await (prisma as any).suppliers.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    // Prisma's MongoDB case-insensitive mode treats symbol-heavy names as
    // regex patterns. Compare these database-backed values literally in
    // application code while tolerating legacy case/spacing differences.
    return filters?.subCategory
      ? suppliers.filter((supplier: any) =>
          supplier.subCategory &&
          normalizeCategoryValue(supplier.subCategory) === normalizeCategoryValue(filters.subCategory!),
        )
      : suppliers;
  },

  async getSupplierById(id: string) {
    return await (prisma as any).suppliers.findUnique({
      where: { id },
    });
  },

  async getProductsBySupplierId(supplierId: string, filters?: { search?: string }) {
    const where: Record<string, any> = { supplierId };

    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    return await (prisma as any).products.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  },

  async getProductsBySupplierIds(supplierIds: string[]) {
    if (supplierIds.length === 0) return [];
    return await (prisma as any).products.findMany({
      where: { supplierId: { in: supplierIds } },
      orderBy: { createdAt: "desc" },
    });
  },

  async getDirectProducts(filters: { category: string; subCategory: string }) {
    // Fetch products that are directly linked to a subcategory (no supplier)
    // Due to Prisma MongoDB limitations with null queries, we fetch all products
    // in the category and filter in JavaScript
    const products = await (prisma as any).products.findMany({
      where: {
        category: filters.category,
      },
      orderBy: { createdAt: "desc" },
    });

    // Filter by subcategory and no supplier using normalized comparison
    return products.filter((product: any) =>
      !product.supplierId && // Must not have a supplier
      product.subCategory &&
      normalizeCategoryValue(product.subCategory) === normalizeCategoryValue(filters.subCategory)
    );
  },

  async getProductById(id: string) {
    return await (prisma as any).products.findUnique({
      where: { id },
    });
  },

  async getAllProducts(filters?: { search?: string }) {
    const where: Record<string, any> = {};
    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    return await (prisma as any).products.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  },

  async getSimilarProducts(currentProductId: string, category?: string, supplierId?: string, limit: number = 4) {
    // Find products in the same category or from the same supplier, excluding the current product
    const where: Record<string, any> = {
      id: { not: currentProductId },
    };

    // Prioritize same category, fallback to same supplier
    if (category) {
      where.OR = [
        { category: category },
        ...(supplierId ? [{ supplierId: supplierId }] : []),
      ];
    } else if (supplierId) {
      where.supplierId = supplierId;
    }

    return await (prisma as any).products.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  },

  async getCarouselImages() {
    try {
      return await (prisma as any).carousel_images.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
        select: {
          id: true,
          imageUrl: true,
          title: true,
          description: true,
          link: true,
        },
      });
    } catch (error) {
      console.error('Error fetching carousel images:', error);
      return [];
    }
  },

  async getCategories() {
    try {
      return await (prisma as any).categories.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
        include: {
          subCategories: {
            where: { isActive: true },
            orderBy: { order: 'asc' },
          },
        },
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },
};
