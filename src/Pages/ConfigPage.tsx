import React, { useState, useEffect } from 'react';
import { Settings, Play, RefreshCcw, FolderOpen, Image as ImageIcon, AlertCircle, ChevronRight, ChevronLeft, Folder, CheckCircle2, X, Maximize2, Info } from 'lucide-react';
import { consultaApiBack } from '../Config/ConsultaApiBack';
import { Button } from '../Components/button';
import { toast } from 'react-hot-toast';

interface FileInfo {
    name: string;
    url: string;
    size: string;
    dimensions: string;
}

interface ExplorerData {
    current_path: string;
    folders: string[];
    files: FileInfo[];
    pagination: {
        total: number;
        page: number;
        page_size: number;
        total_pages: number;
    }
}

export const ConfigPage: React.FC = () => {
    const [cargando, setCargando] = useState<string | null>(null);
    const [explorer, setExplorer] = useState<ExplorerData | null>(null);
    const [path, setPath] = useState<string>('procesadas');
    const [page, setPage] = useState(1);
    const [selectedFile, setSelectedFile] = useState<FileInfo | null>(null);

    const cargarCarpeta = async (newPath: string, newPage: number = 1) => {
        try {
            const res = await consultaApiBack<ExplorerData>(`/procesar/explorar/?path=${newPath}&page=${newPage}`, 'GET');
            setExplorer(res);
            setPath(newPath);
            setPage(newPage);
        } catch (error) {
            console.error("Error cargando carpeta:", error);
            toast.error("No se pudo cargar la carpeta");
        }
    };

    useEffect(() => {
        cargarCarpeta('procesadas');
    }, []);

    const ejecutarAccion = async (endpoint: string, nombre: string) => {
        try {
            setCargando(nombre);
            toast.loading(`Ejecutando ${nombre}...`, { id: 'prog' });
            await consultaApiBack(`/procesar/${endpoint}/`, 'GET');
            toast.success(`${nombre} completado`, { id: 'prog' });
            cargarCarpeta(path, 1);
        } catch (error: any) {
            toast.error(`Error: ${error.message}`, { id: 'prog' });
        } finally {
            setCargando(null);
        }
    };

    const acciones = [
        { id: 'ejecutar_todo', label: 'Proceso Completo', icon: <Play className="size-4" />, variant: 'success' as const },
        { id: 'filtrar', label: '1. Filtrar Imágenes', icon: <RefreshCcw className="size-4" /> },
        { id: 'balancear', label: '2. Balancear Dataset', icon: <RefreshCcw className="size-4" /> },
        { id: 'segmentar', label: '3. Segmentar Conjuntiva', icon: <RefreshCcw className="size-4" /> },
        { id: 'redimensionar', label: '4. Redimensionar', icon: <RefreshCcw className="size-4" /> },
    ];

    const irAtras = () => {
        const segments = path.split('/').filter(Boolean);
        if (segments.length > 0) {
            segments.pop();
            cargarCarpeta(segments.join('/'));
        }
    };

    const irCarpeta = (folderName: string) => {
        const newPath = path ? `${path}/${folderName}` : folderName;
        cargarCarpeta(newPath);
    };

    const breadcrumbs = path.split('/').filter(Boolean);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 dark:shadow-none">
                        <Settings className="text-white size-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Configuración del Sistema</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Control manual de procesos y exploración de carpetas</p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-[350px,1fr] gap-8">
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 list-dir rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                        <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Play className="size-4" /> Acciones de Proceso
                        </h3>
                        <div className="space-y-3">
                            {acciones.map((acc) => (
                                <Button
                                    key={acc.id}
                                    onClick={() => ejecutarAccion(acc.id, acc.label)}
                                    disabled={!!cargando}
                                    variant={acc.variant || 'optional'}
                                    showIcon={false}
                                    className="w-full justify-start py-6 text-sm font-bold"
                                >
                                    {cargando === acc.label ? <RefreshCcw className="size-4 animate-spin mr-2" /> : acc.icon}
                                    <span className="ml-2">{acc.label}</span>
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 p-4 rounded-xl flex gap-3">
                        <AlertCircle className="size-5 text-rose-500 shrink-0" />
                        <p className="text-[10px] text-rose-700 dark:text-rose-400 leading-normal font-medium">
                            <b>ADVERTENCIA:</b> Ejecutar estos procesos limpiará las carpetas de salida correspondientes. Use con precaución.
                        </p>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col min-h-[600px] overflow-hidden">
                    <div className="p-4 border-b dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <FolderOpen className="size-4" /> Explorador de Archivos
                            </h3>
                            {explorer && explorer.pagination.total_pages > 1 && (
                                <div className="flex items-center gap-2">
                                    <button 
                                        disabled={page === 1}
                                        onClick={() => cargarCarpeta(path, page - 1)}
                                        className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 dark:text-white"
                                    >
                                        <ChevronLeft className="size-4" />
                                    </button>
                                    <span className="text-[10px] font-bold dark:text-slate-400">{page} / {explorer.pagination.total_pages}</span>
                                    <button 
                                        disabled={page === explorer.pagination.total_pages}
                                        onClick={() => cargarCarpeta(path, page + 1)}
                                        className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 dark:text-white"
                                    >
                                        <ChevronRight className="size-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 overflow-x-auto whitespace-nowrap pb-1">
                            <span className="hover:text-blue-600 cursor-pointer uppercase" onClick={() => cargarCarpeta('')}>MEDIA</span>
                            {breadcrumbs.map((seg, idx) => (
                                <React.Fragment key={idx}>
                                    <ChevronRight className="size-3 shrink-0" />
                                    <span 
                                        className={`hover:text-blue-600 cursor-pointer uppercase ${idx === breadcrumbs.length - 1 ? 'text-slate-900 dark:text-white' : ''}`}
                                        onClick={() => cargarCarpeta(breadcrumbs.slice(0, idx + 1).join('/'))}
                                    >
                                        {seg}
                                    </span>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 flex-1 overflow-y-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {path && (
                                <div 
                                    onClick={irAtras}
                                    className="group cursor-pointer p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all flex flex-col items-center justify-center gap-2"
                                >
                                    <div className="p-2 bg-slate-200 dark:bg-slate-700 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-800 transition-colors">
                                        <ChevronLeft className="size-5 text-slate-500 dark:text-slate-400 group-hover:text-blue-600" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-600">SUBIR NIVEL</span>
                                </div>
                            )}

                            {explorer?.folders.map((folder) => (
                                <div 
                                    key={folder}
                                    onClick={() => irCarpeta(folder)}
                                    className="group cursor-pointer p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 hover:shadow-md transition-all flex flex-col items-center justify-center gap-2"
                                >
                                    <Folder className="size-8 text-amber-500 fill-amber-500/20 group-hover:scale-110 transition-transform" />
                                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase text-center truncate w-full">{folder}</span>
                                </div>
                            ))}

                            {explorer?.files.map((file, idx) => (
                                <div 
                                    key={idx} 
                                    onClick={() => setSelectedFile(file)}
                                    className="group relative aspect-square bg-slate-50 dark:bg-slate-950 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all cursor-pointer"
                                >
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

                        {!explorer || (explorer.folders.length === 0 && explorer.files.length === 0) ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 space-y-4 py-20">
                                <ImageIcon className="size-12 opacity-20" />
                                <p className="text-sm">Carpeta vacía</p>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>

            {/* Modal de Detalle de Imagen */}
            {selectedFile && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300" 
                    onClick={() => setSelectedFile(null)}
                >
                    <div 
                        className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full border dark:border-slate-800" 
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="p-5 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                                    <ImageIcon className="size-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <div className="text-sm font-black dark:text-white truncate max-w-[250px] sm:max-w-md">{selectedFile.name}</div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{path.replace(/\//g, ' > ')}</div>
                                </div>
                            </div>
                            <button 
                                onClick={() => setSelectedFile(null)} 
                                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors dark:text-white"
                            >
                                <X className="size-6"/>
                            </button>
                        </div>
                        
                        <div className="grid md:grid-cols-[1fr,300px]">
                            <div className="p-6 bg-slate-100 dark:bg-slate-950 flex items-center justify-center min-h-[300px]">
                                <img 
                                    src={`http://localhost:8000${selectedFile.url}`} 
                                    className="max-w-full max-h-[70vh] rounded-2xl shadow-2xl" 
                                    alt="Detalle" 
                                    crossOrigin="anonymous" 
                                />
                            </div>
                            
                            <div className="p-6 bg-white dark:bg-slate-900 space-y-6">
                                <h4 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Info className="size-3.5" /> Propiedades
                                </h4>
                                
                                <div className="space-y-4">
                                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border dark:border-slate-800">
                                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Nombre</p>
                                        <p className="text-xs font-bold dark:text-white break-all">{selectedFile.name}</p>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border dark:border-slate-800">
                                            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Tamaño</p>
                                            <p className="text-xs font-bold dark:text-white">{selectedFile.size}</p>
                                        </div>
                                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border dark:border-slate-800">
                                            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Dimensiones</p>
                                            <p className="text-xs font-bold dark:text-white">{selectedFile.dimensions}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                                        <p className="text-[10px] font-bold text-blue-400 dark:text-blue-500 uppercase mb-1">Ubicación</p>
                                        <p className="text-[10px] font-medium text-blue-700 dark:text-blue-300 italic truncate" title={selectedFile.url}>
                                            ...{selectedFile.url}
                                        </p>
                                    </div>
                                </div>
                                
                                <Button className="w-full" onClick={() => window.open(`http://localhost:8000${selectedFile.url}`, '_blank')}>
                                    <Maximize2 className="size-4 mr-2" /> Abrir Original
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
