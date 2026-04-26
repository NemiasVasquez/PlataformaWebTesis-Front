import React from 'react';
import { Package, Download, RefreshCcw } from 'lucide-react';
import { Button } from '../button';

interface DatasetActionsProps {
    cargando: string | null;
    onEjecutar: (id: string, label: string) => void;
}

export const DatasetActions: React.FC<DatasetActionsProps> = ({ cargando, onEjecutar }) => {
    const isThisLoading = cargando === 'Preparar Dataset Modelo';

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Package className="size-4" /> Exportación Final
            </h3>
            <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-xl">
                    <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed mb-4">
                        Crea un archivo <strong>.zip</strong> con las imágenes aumentadas organizadas para el entrenamiento.
                    </p>
                    
                    <Button
                        onClick={() => onEjecutar('preparar_dataset', 'Preparar Dataset Modelo')}
                        disabled={!!cargando}
                        variant="optional"
                        showIcon={false}
                        className="w-full py-6 text-sm font-bold"
                    >
                        {isThisLoading ? (
                            <RefreshCcw className="size-4 animate-spin mr-2" />
                        ) : (
                            <Download className="size-4 mr-2" />
                        )}
                        <span>Generar ConjuntivaPng.zip</span>
                    </Button>
                </div>
                
                <div className="flex items-start gap-2 px-2">
                    <div className="size-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        Ubicación: <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">media/data_modelo/</code>
                    </p>
                </div>
            </div>
        </div>
    );
};
