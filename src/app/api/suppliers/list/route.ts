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

        return NextResponse.json({ suppliers });
    } catch (error) {
        console.error("Error fetching suppliers:", error);
        return NextResponse.json(
            { error: "Failed to fetch suppliers" },
            { status: 500 }
        );
    }
}
