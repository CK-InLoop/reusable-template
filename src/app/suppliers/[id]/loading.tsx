import { ProductCardSkeleton, SupplierProfileSkeleton } from "@/components/Skeletons";

export default function Loading() {
    return (
        <div className="mx-auto max-w-6xl px-4 py-8">
            <SupplierProfileSkeleton />

            <div className="mt-12">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-8">
                    <div className="flex-1 space-y-2">
                        <div className="h-8 w-64 bg-gray-200 animate-pulse rounded-lg" />
                        <div className="h-4 w-96 bg-gray-200 animate-pulse rounded-md" />
                    </div>
                    <div className="w-full md:w-72 h-10 bg-gray-200 animate-pulse rounded-md" />
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}
