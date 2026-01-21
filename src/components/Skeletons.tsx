import { Skeleton } from "./ui/Skeleton";

export function ProductCardSkeleton() {
    return (
        <div className="rounded-lg border border-[#e2e8f0] bg-white p-4 shadow-sm">
            <Skeleton className="aspect-square w-full rounded-md" />
            <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <div className="mt-4 flex items-center justify-between">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-8 w-1/3 rounded-full" />
                </div>
            </div>
        </div>
    );
}

export function SidebarSkeleton() {
    return (
        <div className="space-y-4 py-4 px-2">
            <Skeleton className="h-6 w-3/4 mx-2" />
            <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-1/2 mx-2" />
                        <div className="pl-4 space-y-1">
                            <Skeleton className="h-3 w-4/5" />
                            <Skeleton className="h-3 w-3/4" />
                            <Skeleton className="h-3 w-2/3" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function CategorySkeleton() {
    return (
        <div className="space-y-2 py-2">
            <Skeleton className="h-10 w-full rounded-lg" />
            <div className="pl-4 space-y-1">
                <Skeleton className="h-8 w-full rounded-md" />
                <Skeleton className="h-8 w-full rounded-md" />
                <Skeleton className="h-8 w-full rounded-md" />
            </div>
        </div>
    );
}

export function SupplierProfileSkeleton() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
                <Skeleton className="h-32 w-32 rounded-lg" />
                <div className="flex-1 space-y-4 w-full">
                    <Skeleton className="h-8 w-1/2" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
export function FlyoutSkeleton({ isMobile = false }: { isMobile?: boolean }) {
    return (
        <div className={`flex ${isMobile ? 'flex-col' : 'gap-4'} w-full`}>
            <div className="flex-1">
                <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3'} gap-3 md:gap-4`}>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="rounded-lg border border-[#e2e8f0] overflow-hidden bg-white">
                            <Skeleton className="h-16 md:h-20 w-full" />
                            <div className="p-2">
                                <Skeleton className="h-3 w-3/4 mx-auto" />
                            </div>
                        </div>
                    ))}
                </div>
                {!isMobile && (
                    <div className="mt-8 pt-6 border-t border-slate-100">
                        <Skeleton className="h-4 w-1/4 mb-4" />
                        <div className="grid grid-cols-3 gap-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="rounded-lg border border-[#e2e8f0] overflow-hidden bg-white">
                                    <Skeleton className="h-24 w-full" />
                                    <div className="p-2 space-y-2">
                                        <Skeleton className="h-3 w-3/4" />
                                        <Skeleton className="h-2 w-1/2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {!isMobile && (
                <div className="w-[180px] flex-shrink-0 border-l border-slate-200 pl-4 space-y-4">
                    <Skeleton className="h-4 w-3/4 mx-auto" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>
            )}
        </div>
    );
}
