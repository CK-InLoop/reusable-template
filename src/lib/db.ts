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

  async getProductsBySupplierId(supplierId: string) {
    return await (prisma as any).products.findMany({
      where: { supplierId },
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
};
