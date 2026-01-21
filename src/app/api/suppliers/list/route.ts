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

        let products = [] as any[];
        if (suppliers.length > 0 && suppliers.length <= 4) {
            const supplierIds = suppliers.map((s: any) => s.id);
            products = await db.getProductsBySupplierIds(supplierIds);
            // Limit to 6 products for the flyout to avoid overcrowding
            products = products.slice(0, 6);
        }

        return NextResponse.json({ suppliers, products });
    } catch (error) {
        console.error("Error fetching suppliers:", error);
        return NextResponse.json(
            { error: "Failed to fetch suppliers" },
            { status: 500 }
        );
    }
}
