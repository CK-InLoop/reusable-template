import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const category = searchParams.get("category");
        const subCategory = searchParams.get("subCategory");

        if (!category) {
            return NextResponse.json({ suppliers: [] });
        }

        const suppliers = await db.getSuppliers({
            category: category,
            subCategory: subCategory || undefined,
        });

        const publicSuppliers = suppliers.map((supplier: any) => ({
            id: supplier.id,
            name: supplier.name,
            companyName: supplier.companyName,
            email: supplier.email,
            phone: supplier.phone,
            contactPhone: supplier.contactPhone,
            address: supplier.address,
            city: supplier.city,
            state: supplier.state,
            pincode: supplier.pincode,
            gstNumber: supplier.gstNumber,
            description: supplier.description,
            profileImage: supplier.profileImage,
            category: supplier.category,
            subCategory: supplier.subCategory,
        }));

        let products = [] as any[];
        if (suppliers.length > 0) {
            const supplierIds = suppliers.map((s: any) => s.id);
            products = await db.getProductsBySupplierIds(supplierIds);
            products = products.map((product: any) => ({
                id: product.id,
                supplierId: product.supplierId,
                name: product.name,
                title: product.title,
                category: product.category,
                description: product.description,
                shortDescription: product.shortDescription,
                fullDescription: product.fullDescription,
                specifications: product.specifications,
                price: product.price,
                priceRange: product.priceRange,
                capacity: product.capacity,
                unit: product.unit,
                minOrderQty: product.minOrderQty,
                availability: product.availability,
                tags: product.tags,
                images: product.images,
            }));
        }

        return NextResponse.json({ suppliers: publicSuppliers, products });
    } catch (error) {
        console.error("Error fetching suppliers:", error);
        return NextResponse.json(
            { error: "Failed to fetch suppliers" },
            { status: 500 }
        );
    }
}
