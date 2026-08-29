import SiteLayout from "@/components/SiteLayout";

export default function Loading() {
    return (
        <SiteLayout activePath="/products">
            <div className="animate-pulse space-y-6">
                {/* Breadcrumb skeleton */}
                <div className="flex items-center gap-2">
                    <div className="h-4 w-20 bg-slate-200 rounded"></div>
                    <div className="h-4 w-4 bg-slate-200 rounded"></div>
                    <div className="h-4 w-32 bg-slate-200 rounded"></div>
                </div>

                {/* Product card skeleton */}
                <div className="rounded-lg border-2 border-slate-200 bg-white p-6 lg:p-8">
                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Image skeleton */}
                        <div className="space-y-4">
                            <div className="aspect-square bg-slate-200 rounded-lg"></div>
                            <div className="grid grid-cols-4 gap-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="aspect-square bg-slate-200 rounded-md"></div>
                                ))}
                            </div>
                        </div>

                        {/* Details skeleton */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="h-4 w-16 bg-slate-200 rounded"></div>
                                <div className="h-10 w-3/4 bg-slate-200 rounded"></div>
                            </div>
                            <div className="flex gap-2">
                                <div className="h-6 w-20 bg-slate-200 rounded-full"></div>
                                <div className="h-6 w-24 bg-slate-200 rounded-full"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 w-full bg-slate-200 rounded"></div>
                                <div className="h-4 w-5/6 bg-slate-200 rounded"></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-20 bg-slate-200 rounded-lg"></div>
                                <div className="h-20 bg-slate-200 rounded-lg"></div>
                            </div>
                            <div className="space-y-3">
                                <div className="h-12 bg-slate-200 rounded-md"></div>
                                <div className="flex gap-3">
                                    <div className="h-12 flex-1 bg-slate-200 rounded-md"></div>
                                    <div className="h-12 flex-1 bg-slate-200 rounded-md"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SiteLayout>
    );
}
