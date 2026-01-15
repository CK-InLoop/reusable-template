import { ProductCardSkeleton } from "@/components/Skeletons";

export default function Loading() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="flex flex-col gap-2 w-full max-w-md">
                    <div className="h-10 w-3/4 bg-gray-200 animate-pulse rounded-lg" />
                    <div className="h-4 w-full bg-gray-200 animate-pulse rounded-md" />
                </div>
                <div className="w-full md:w-72 h-10 bg-gray-200 animate-pulse rounded-md" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <ProductCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}
