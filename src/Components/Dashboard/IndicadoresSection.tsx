import React from 'react';
import { Activity } from 'lucide-react';
import { AnalisisRespuesta } from '../../Types/Anemia';

export const IndicadoresSection: React.FC<{ respuesta: AnalisisRespuesta }> = ({ respuesta }) => {
    if (!respuesta || respuesta.rcap === undefined) return null;

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-colors duration-300 mt-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-2 mb-6 text-slate-900 dark:text-white">
                <Activity className="size-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-lg font-bold">Indicadores</h3>
            </div>

            <div className="space-y-6">
                {/* Sección: Técnica SmoothGrad */}
                <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
                        Técnica SmoothGrad
                    </h4>
                    
                    <div className="grid gap-4">
                        <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 flex justify-between items-center shadow-sm">
                            <div>
                                <span className="font-bold text-slate-700 dark:text-slate-300 block">a) Detalle visual (RCAP)</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">Proporción de intensidad en región importante</span>
                            </div>
                            <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">{respuesta.rcap}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
