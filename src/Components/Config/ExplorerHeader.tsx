import React from 'react';
import { FolderOpen, ChevronLeft, ChevronRight } from 'lucide-react';

interface ExplorerHeaderProps {
    path: string;
    page: number;
    totalPages: number;
    onNavigate: (newPath: string, newPage?: number) => void;
}

export const ExplorerHeader: React.FC<ExplorerHeaderProps> = ({ path, page, totalPages, onNavigate }) => {
    const breadcrumbs = path.split('/').filter(Boolean);

    return (
        <div className="p-4 border-b dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <FolderOpen className="size-4" /> Explorador de Archivos
                </h3>
                {totalPages > 1 && (
                    <div className="flex items-center gap-2">
                        <button disabled={page === 1} onClick={() => onNavigate(path, page - 1)} className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 dark:text-white">
                            <ChevronLeft className="size-4" />
                        </button>
                        <span className="text-[10px] font-bold dark:text-slate-400">{page} / {totalPages}</span>
                        <button disabled={page === totalPages} onClick={() => onNavigate(path, page + 1)} className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 dark:text-white">
                            <ChevronRight className="size-4" />
                        </button>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 overflow-x-auto whitespace-nowrap pb-1">
                <span className="hover:text-blue-600 cursor-pointer uppercase" onClick={() => onNavigate('')}>MEDIA</span>
                {breadcrumbs.map((seg, idx) => (
                    <React.Fragment key={idx}>
                        <ChevronRight className="size-3 shrink-0" />
                        <span 
                            className={`hover:text-blue-600 cursor-pointer uppercase ${idx === breadcrumbs.length - 1 ? 'text-slate-900 dark:text-white' : ''}`}
                            onClick={() => onNavigate(breadcrumbs.slice(0, idx + 1).join('/'))}
                        >
                            {seg}
                        </span>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
