import { Skeleton } from "@/components/ui/Skeleton";
import { ProductCardSkeleton } from "@/components/Skeletons";

export default function Loading() {
    return (
        <div className="mx-auto max-w-6xl px-4 py-8">
            {/* Breadcrumb Skeleton */}
            <div className="mb-6 flex items-center gap-2">
                <Skeleton className="h-4 w-16" />
                <span className="text-gray-300">›</span>
                <Skeleton className="h-4 w-24" />
                <span className="text-gray-300">›</span>
                <Skeleton className="h-4 w-32" />
            </div>

            {/* Main Product Card Skeleton */}
            <section className="rounded-lg border-2 border-[#e2e8f0] bg-white p-6 md:p-8 shadow-sm">
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Images Skeleton */}
                    <div className="space-y-4">
                        <Skeleton className="aspect-square w-full rounded-lg" />
                        <div className="grid grid-cols-4 gap-3">
                            <Skeleton className="aspect-square w-full rounded-md" />
                            <Skeleton className="aspect-square w-full rounded-md" />
                            <Skeleton className="aspect-square w-full rounded-md" />
                            <Skeleton className="aspect-square w-full rounded-md" />
                        </div>
                    </div>

                    {/* Details Skeleton */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-10 w-3/4" />
                        </div>

                        <div className="flex gap-2">
                            <Skeleton className="h-6 w-16 rounded-full" />
                            <Skeleton className="h-6 w-20 rounded-full" />
                            <Skeleton className="h-6 w-16 rounded-full" />
                        </div>

                        <Skeleton className="h-20 w-full" />

                        <div className="grid grid-cols-2 gap-4">
                            <Skeleton className="h-16 w-full rounded-lg" />
                            <Skeleton className="h-16 w-full rounded-lg" />
                        </div>

                        <div className="space-y-3 pt-2">
                            <Skeleton className="h-12 w-full rounded-md" />
                            <div className="flex flex-col gap-3 md:flex-row">
                                <Skeleton className="h-12 w-full md:flex-1 rounded-md" />
                                <Skeleton className="h-12 w-full md:flex-1 rounded-md" />
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="my-8 border-[#e2e8f0]" />

                {/* Description Skeleton */}
                <div className="space-y-4">
                    <Skeleton className="h-6 w-32" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </div>
            </section>
        </div>
    );
}
