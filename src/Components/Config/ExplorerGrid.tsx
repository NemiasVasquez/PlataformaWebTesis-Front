import React from 'react';
import { Folder, ChevronLeft, Image as ImageIcon, Maximize2, CheckCircle2 } from 'lucide-react';

interface FileInfo {
    name: string;
    url: string;
    size: string;
    dimensions: string;
}

interface ExplorerGridProps {
    path: string;
    folders: string[];
    files: FileInfo[];
    onFolderClick: (name: string) => void;
    onBack: () => void;
    onFileClick: (file: FileInfo) => void;
}

export const ExplorerGrid: React.FC<ExplorerGridProps> = ({ path, folders, files, onFolderClick, onBack, onFileClick }) => {
    return (
        <div className="p-6 flex-1 overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {path && (
                    <div onClick={onBack} className="group cursor-pointer p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all flex flex-col items-center justify-center gap-2">
                        <div className="p-2 bg-slate-200 dark:bg-slate-700 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-800 transition-colors">
                            <ChevronLeft className="size-5 text-slate-500 dark:text-slate-400 group-hover:text-blue-600" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-600">SUBIR NIVEL</span>
                    </div>
                )}

                {folders.map((folder) => (
                    <div key={folder} onClick={() => onFolderClick(folder)} className="group cursor-pointer p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 hover:shadow-md transition-all flex flex-col items-center justify-center gap-2">
                        <Folder className="size-8 text-amber-500 fill-amber-500/20 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase text-center truncate w-full">{folder}</span>
                    </div>
                ))}

                {files.map((file, idx) => (
                    <div key={idx} onClick={() => onFileClick(file)} className="group relative aspect-square bg-slate-50 dark:bg-slate-950 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all cursor-pointer">
                        <img 
                            src={`http://localhost:8000${file.url}`} 
                            alt={file.name} 
                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                            crossOrigin="anonymous"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity">
                            <Maximize2 className="text-white size-6" />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-2 bg-black/70 translate-y-full group-hover:translate-y-0 transition-transform flex justify-between items-center">
                            <p className="text-[8px] text-white truncate font-mono flex-1">{file.name}</p>
                            <CheckCircle2 className="size-3 text-green-500 ml-1" />
                        </div>
                    </div>
                ))}
            </div>

            {(folders.length === 0 && files.length === 0) ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 space-y-4 py-20">
                    <ImageIcon className="size-12 opacity-20" />
                    <p className="text-sm">Carpeta vacía</p>
                </div>
            ) : null}
        </div>
    );
};
