import React from 'react';

export const AnalysisSkeleton: React.FC = () => {
    return (
        <div className="animate-pulse space-y-6">
            {/* Header / Summary Skeleton */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="size-48 rounded-2xl bg-slate-200 dark:bg-slate-800" />
                    <div className="flex-1 space-y-4 w-full">
                        <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
                        <div className="h-10 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                        <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded" />
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="h-16 bg-slate-100 dark:bg-slate-800/50 rounded-2xl" />
                            <div className="h-16 bg-slate-100 dark:bg-slate-800/50 rounded-2xl" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Steps Skeleton */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded mb-8" />
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4 items-start">
                        <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
                        <div className="flex-1 space-y-3">
                            <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-800 rounded" />
                            <div className="h-3 w-full bg-slate-100 dark:bg-slate-800/50 rounded" />
                            <div className="h-32 bg-slate-50 dark:bg-slate-800/20 rounded-2xl" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
