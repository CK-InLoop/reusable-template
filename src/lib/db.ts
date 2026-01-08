import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

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
    // Note: Schema doesn't have emailVerificationToken yet. 
    // I will need to update the schema next.
    // For now, mirroring the D1 logic if fields exist.
    return await (prisma.user as any).findFirst({
      where: {
        emailVerificationToken: token,
        emailVerificationExpires: {
          gt: new Date(),
        },
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
        // Assuming fields will be added to schema
        ...({
          emailVerified: false,
          emailVerificationToken: data.emailVerificationToken,
          emailVerificationExpires: new Date(data.emailVerificationExpires),
        } as any),
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
    if (filters?.category) where.category = filters.category;
    if (filters?.subCategory) where.subCategory = filters.subCategory;

    return await (prisma as any).suppliers.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
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
};
