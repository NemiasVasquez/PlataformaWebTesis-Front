import React, { useState, useEffect } from 'react';
import { Settings, AlertCircle } from 'lucide-react';
import { consultaApiBack } from '../Config/ConsultaApiBack';
import { toast } from 'react-hot-toast';

// Componentes Modularizados
import { ProcessActions } from '../Components/Config/ProcessActions';
import { ExplorerHeader } from '../Components/Config/ExplorerHeader';
import { ExplorerGrid } from '../Components/Config/ExplorerGrid';
import { FileDetailModal } from '../Components/Config/FileDetailModal';
import { DiscardModal } from '../Components/Config/DiscardModal';
import { PageHeader } from '../Components/Common/PageHeader';

interface FileInfo {
    name: string;
    url: string;
    size: string;
    resolution: string;
}

interface FolderInfo {
    name: string;
    count: number;
}

interface ExplorerData {
    current_path: string;
    folders: FolderInfo[];
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
    const [mostrarDescarte, setMostrarDescarte] = useState(false);

    const cargarCarpeta = async (newPath: string, newPage: number = 1) => {
        try {
            const res = await consultaApiBack<ExplorerData>(`/procesar/explorar/?path=${newPath}&page=${newPage}`, 'GET');
            setExplorer(res);
            setPath(newPath);
            setPage(newPage);
        } catch (error) {
            toast.error("No se pudo cargar la carpeta");
        }
    };

    useEffect(() => { cargarCarpeta('procesadas'); }, []);

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

    const handleDescartar = async (razon: string) => {
        if (!selectedFile) return;
        const categoria = path.includes('CON ANEMIA') ? 'CON ANEMIA' : 'SIN ANEMIA';
        try {
            toast.loading("Desterrando imagen...", { id: 'move' });
            await consultaApiBack('/procesar/mover_archivo/', 'POST', {
                nombre_archivo: selectedFile.name,
                categoria: categoria,
                razon_rechazo: razon
            });
            toast.success("Imagen Descartada", { id: 'move' });
            setSelectedFile(null);
            setMostrarDescarte(false);
            cargarCarpeta(path, page);
        } catch (error: any) {
            toast.error(`Fallo: ${error.message}`, { id: 'move' });
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <PageHeader 
                title="Configuración" 
                subtitle="Control de procesos y archivos" 
                icon={Settings} 
                iconBgColor="bg-blue-600" 
            />

            <div className="grid lg:grid-cols-[350px,1fr] gap-8">
                <aside className="space-y-6">
                    <ProcessActions cargando={cargando} onEjecutar={ejecutarAccion} />
                    <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 p-4 rounded-xl flex gap-3">
                        <AlertCircle className="size-5 text-rose-500 shrink-0" />
                        <p className="text-[10px] text-rose-700 dark:text-rose-400 leading-normal font-black uppercase tracking-widest">
                            Limpieza automática al procesar.
                        </p>
                    </div>
                </aside>

                <main className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col min-h-[600px] overflow-hidden">
                    <ExplorerHeader 
                        path={path} 
                        page={page} 
                        totalPages={explorer?.pagination.total_pages || 0} 
                        onNavigate={cargarCarpeta} 
                    />
                    <ExplorerGrid 
                        path={path} 
                        folders={explorer?.folders || []} 
                        files={explorer?.files || []} 
                        onFolderClick={(folder) => cargarCarpeta(`${path}/${folder}`)}
                        onBack={() => {
                            const segments = path.split('/').filter(Boolean);
                            segments.pop();
                            cargarCarpeta(segments.join('/'));
                        }}
                        onFileClick={setSelectedFile}
                    />
                </main>
            </div>

            <FileDetailModal 
                file={selectedFile} 
                path={path} 
                onClose={() => setSelectedFile(null)} 
                onOpenDiscard={() => setMostrarDescarte(true)} 
            />
            
            <DiscardModal 
                open={mostrarDescarte} 
                onClose={() => setMostrarDescarte(false)} 
                onDiscard={handleDescartar} 
            />
        </div>
    );
};
