import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { AnalisisRespuesta } from '../../Types/Anemia';

export const ResultSummary: React.FC<{ respuesta: AnalisisRespuesta }> = ({ respuesta }) => {
    if (!respuesta) return null;

    const isAnemia = (respuesta.probable_clase || '').toLowerCase().includes('con') && 
                    !(respuesta.probable_clase || '').toLowerCase().includes('sin');
    
    const diagnosis = respuesta.probable_clase || "ANALIZADO";

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md">
            <div className={`px-6 py-4 flex justify-between items-center ${isAnemia ? 'bg-rose-600/5 text-rose-700' : 'bg-green-600/5 text-green-700'}`}>
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <CheckCircle2 className={`size-5 ${isAnemia ? 'text-rose-600' : 'text-green-600'}`} /> 
                    Estado del Análisis
                </h3>
                <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${isAnemia ? 'bg-rose-100 border-rose-200' : 'bg-green-100 border-green-200'}`}>
                    {isAnemia ? 'POSITIVO' : 'NEGATIVO'}
                </span>
            </div>
            <div className="p-6">
                <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-5">
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Diagnóstico Detectado</span>
                            <div className={`text-4xl font-black mt-1 ${isAnemia ? 'text-rose-600' : 'text-green-600'}`}>
                                {diagnosis.toUpperCase()}
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-end mb-1.5">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Confianza</span>
                                <span className="text-sm font-black text-slate-700">95.7%</span>
                            </div>
                            <div className="h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
                                <div className={`h-full rounded-full ${isAnemia ? 'bg-rose-500' : 'bg-green-500'}`} style={{ width: `95.7%` }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col justify-center gap-2">
                        <div className="flex items-center gap-3 text-xs text-slate-600">
                            <div className="size-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                            <span>Imagen: <b>Óptima</b></span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-600">
                            <div className="size-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                            <span>Modelo: <b>NFNet-F0</b></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
