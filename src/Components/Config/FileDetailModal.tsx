import React from 'react';
import { X, Image as ImageIcon, Info, Maximize2 } from 'lucide-react';
import { Button } from '../button';

interface FileInfo {
    name: string;
    url: string;
    url_original?: string;
    size: string;
    resolution: string;
}

interface FileDetailModalProps {
    file: FileInfo | null;
    path: string;
    onClose: () => void;
    onOpenDiscard: () => void;
}

export const FileDetailModal: React.FC<FileDetailModalProps> = ({ file, path, onClose, onOpenDiscard }) => {
    if (!file) return null;

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300" 
            onClick={onClose}
        >
            <div 
                className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full border dark:border-slate-800" 
                onClick={e => e.stopPropagation()}
            >
                <div className="p-5 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                            <ImageIcon className="size-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <div className="text-sm font-black dark:text-white truncate max-w-[250px] sm:max-w-md">{file.name}</div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{path.replace(/\//g, ' > ')}</div>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors dark:text-white">
                        <X className="size-6" />
                    </button>
                </div>
                
                <div className="grid md:grid-cols-[1fr,300px]">
                    <div className="p-6 bg-slate-100 dark:bg-slate-950 flex flex-col md:flex-row items-center justify-center gap-6 overflow-auto min-h-[300px] max-h-[75vh]">
                        {file.url_original && (
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase bg-white dark:bg-slate-800 px-3 py-1 rounded-full shadow-sm">Foto Original</span>
                                <img 
                                    src={`http://localhost:8000${file.url_original}`} 
                                    className="max-w-full max-h-[50vh] object-contain rounded-2xl shadow-xl border-4 border-white dark:border-slate-800" 
                                    alt="Original" 
                                    crossOrigin="anonymous" 
                                />
                            </div>
                        )}
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-[10px] font-black text-blue-500 tracking-widest uppercase bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full shadow-sm">Recorte / Proceso actual</span>
                            <img 
                                src={`http://localhost:8000${file.url}`} 
                                className="max-w-full max-h-[60vh] object-contain rounded-2xl shadow-2xl border-4 border-blue-500/20" 
                                alt="Recortada" 
                                crossOrigin="anonymous" 
                            />
                        </div>
                    </div>
                    
                    <div className="p-6 bg-white dark:bg-slate-900 space-y-6">
                        <h4 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                            <Info className="size-3.5" /> Propiedades
                        </h4>
                        
                        <div className="space-y-3">
                            <Property label="Nombre" value={file.name} />
                            <div className="grid grid-cols-2 gap-3">
                                <Property label="Tamaño" value={file.size} />
                                <Property label="Dimensiones" value={file.resolution || 'Procesando...'} />
                            </div>
                        </div>
                        
                        <div className="flex gap-2">
                            <Button className="flex-1" onClick={() => window.open(`http://localhost:8000${file.url}`, '_blank')}>
                                <Maximize2 className="size-4 mr-2" /> Abrir
                            </Button>
                            {!path.includes('no_filtradas') && (
                                <Button variant="cancelar" className="px-4" onClick={onOpenDiscard}>
                                    Descartar
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Property = ({ label, value }: { label: string, value: string }) => (
    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border dark:border-slate-800">
        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">{label}</p>
        <p className="text-xs font-bold dark:text-white break-all">{value}</p>
    </div>
);
