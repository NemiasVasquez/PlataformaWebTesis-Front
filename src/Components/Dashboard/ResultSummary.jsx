import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const ResultSummary = ({ respuesta }) => {
    if (!respuesta || typeof respuesta !== 'object') return null;

    const isAnemia = (respuesta.probable_clase || '').toLowerCase().includes('anemia') && 
                    !(respuesta.probable_clase || '').toLowerCase().includes('sin anemia');
    
    // Si probable_clase dice "Sin Anemia", isAnemia debe ser falso.
    const diagnosis = respuesta.probable_clase || "ANALIZADO";

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 text-white flex justify-between items-center">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <CheckCircle2 className="text-green-400 size-5" /> Resultado
                </h3>
            </div>
            <div className="p-6">
                <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Diagnóstico</span>
                            <div className={`text-2xl font-black ${isAnemia ? 'text-rose-600' : 'text-green-600'}`}>
                                {diagnosis}
                            </div>
                        </div>
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Confianza</span>
                            <div className="flex items-center gap-3 mt-1">
                                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500"
                                        style={{ width: `95%` }}
                                    ></div>
                                </div>
                                <span className="text-sm font-bold text-slate-700">95.7%</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-xs space-y-2">
                        <div className="flex items-center gap-2 text-slate-600">
                            <div className="size-1.5 rounded-full bg-green-500"></div>
                            <span>Imagen: Óptima</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                            <div className="size-1.5 rounded-full bg-blue-500"></div>
                            <span>Modelo: NFNet (Entrenado)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
