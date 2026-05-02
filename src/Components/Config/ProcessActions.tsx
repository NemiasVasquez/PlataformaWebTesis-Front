import React from 'react';
import { Play, RefreshCcw } from 'lucide-react';
import { Button } from '../button';

interface Action {
    id: string;
    label: string;
    icon: React.ReactNode;
    variant?: 'success' | 'optional';
}

interface ProcessActionsProps {
    cargando: string | null;
    onEjecutar: (id: string, label: string) => void;
}

export const ProcessActions: React.FC<ProcessActionsProps> = ({ cargando, onEjecutar }) => {
    const acciones: Action[] = [
        { id: 'ejecutar_todo', label: 'Proceso Completo', icon: <Play className="size-4" />, variant: 'success' },
        { id: 'prueba_rapida', label: 'Prueba rápida (20+20)', icon: <Play className="size-4" />, variant: 'optional' },
        { id: 'recortar_ojo', label: '1. Recortar Ojos', icon: <RefreshCcw className="size-4" /> },
        { id: 'filtrar', label: '2. Filtrar Imágenes', icon: <RefreshCcw className="size-4" /> },
        { id: 'balancear', label: '3. Balancear Dataset', icon: <RefreshCcw className="size-4" /> },
        { id: 'segmentar', label: '4. Segmentar Conjuntiva', icon: <RefreshCcw className="size-4" /> },
        { id: 'redimensionar', label: '5. Redimensionar', icon: <RefreshCcw className="size-4" /> },
        { id: 'aumentar', label: '6. Aumentar Dataset', icon: <RefreshCcw className="size-4" /> },
    ];

    return (
        <div className="bg-white dark:bg-slate-900 list-dir rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Play className="size-4" /> Acciones de Proceso
            </h3>
            <div className="space-y-3">
                {acciones.map((acc) => (
                    <Button
                        key={acc.id}
                        onClick={() => onEjecutar(acc.id, acc.label)}
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
    );
};
