import { SidebarSkeleton } from "@/components/Skeletons";

export default function Loading() {
    return (
        <div className="mx-auto max-w-6xl px-4 py-8">
            <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                <aside className="hidden lg:block border border-[#e2e8f0] rounded-lg bg-white overflow-hidden">
                    <SidebarSkeleton />
                </aside>

                <div className="space-y-8">
                    {/* Carousel Skeleton */}
                    <div className="h-[300px] md:h-[450px] w-full bg-gray-200 animate-pulse rounded-lg" />

                    {/* Hero Section Skeleton */}
                    <div className="grid gap-8 rounded-lg border border-[#e2e8f0] bg-white p-6 lg:grid-cols-2 lg:p-8">
                        <div className="space-y-4">
                            <div className="h-10 w-3/4 bg-gray-200 animate-pulse rounded-lg" />
                            <div className="h-6 w-full bg-gray-200 animate-pulse rounded-md" />
                            <div className="h-20 w-full bg-gray-200 animate-pulse rounded-md" />
                            <div className="flex gap-4">
                                <div className="h-12 w-32 bg-gray-200 animate-pulse rounded-md" />
                                <div className="h-12 w-32 bg-gray-200 animate-pulse rounded-md" />
                            </div>
                        </div>
                        <div className="h-64 md:h-80 w-full bg-gray-200 animate-pulse rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
}
