import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { consultaApiBack } from '../Config/ConsultaApiBack';
import { BrainCircuit, PlayCircle, Activity } from 'lucide-react';

export const IndicadoresPage: React.FC = () => {
    const [cargando, setCargando] = useState(false);
    const [resultados, setResultados] = useState<any>(null);

    const ejecutarIndicadores = async () => {
        try {
            setCargando(true);
            toast.loading("Calculando indicadores de explicabilidad (SmoothGrad)...", { id: 'ind' });
            
            // Usamos un FormData vacío solo para cumplir con el POST
            const formData = new FormData();
            const res = await consultaApiBack<any>('/modelo/evaluar_indicadores/', 'POST', formData, true);
            
            setResultados(res);
            toast.success("Cálculo completado", { id: 'ind' });
        } catch (error: any) {
            toast.error(error.message || "Error al calcular", { id: 'ind' });
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-rose-100 dark:bg-rose-900/30 rounded-xl text-rose-600 dark:text-rose-400">
                        <Activity className="size-8" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black uppercase tracking-tight dark:text-white">Indicadores de Explicabilidad</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                            Métricas para validar el Nivel de Detalle (D) y el RCAP de los mapas de calor (SmoothGrad).
                        </p>
                    </div>
                </div>

                <div className="mb-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                    <h3 className="font-bold text-indigo-800 dark:text-indigo-300 mb-2 uppercase text-sm tracking-widest">Finalidad del Análisis</h3>
                    <p className="text-sm text-indigo-700 dark:text-indigo-400">
                        Este módulo permite validar matemáticamente la precisión de las explicaciones visuales generadas (SmoothGrad). 
                        Al ejecutar la evaluación, se calcula qué tan útiles y precisas son las regiones resaltadas por el mapa de calor 
                        en relación a la confianza real que el modelo otorga para detectar la patología.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
                    <h3 className="text-lg font-black uppercase tracking-tight dark:text-white">Métricas Evaluadas</h3>
                    <button
                        onClick={ejecutarIndicadores}
                        disabled={cargando}
                        className="py-2.5 px-5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 dark:text-slate-900 text-white rounded-lg font-bold transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                        {cargando ? (
                            <BrainCircuit className="size-4 animate-pulse" />
                        ) : (
                            <PlayCircle className="size-4" />
                        )}
                        {cargando ? 'EVALUANDO LOTE...' : 'CALCULAR INDICADORES'}
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="size-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]"></div>
                            <h3 className="font-bold text-slate-800 dark:text-slate-200">RCAP Individual</h3>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Evalúa cuánto del "Ruido Visual" de un mapa de calor contribuye a la "Localización" real. Calculado mediante deciles de importancia visual.
                        </p>
                    </div>
                    <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="size-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]"></div>
                            <h3 className="font-bold text-slate-800 dark:text-slate-200">Nivel de Detalle (D)</h3>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Promedio global porcentual de los valores de RCAP en un conjunto de imágenes. Define la precisión estadística de las explicaciones.
                        </p>
                    </div>
                </div>
            </div>

            {resultados && (
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm animate-in fade-in duration-500">
                    <h3 className="text-xl font-black uppercase tracking-tight mb-6 dark:text-white">Resultados de Evaluación</h3>
                    
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="p-6 bg-rose-50 dark:bg-rose-950/40 rounded-2xl border border-rose-100 dark:border-rose-900 text-center">
                            <p className="text-sm font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest mb-1">Nivel de Detalle (D)</p>
                            <p className="text-5xl font-black text-slate-800 dark:text-white">{resultados.D}%</p>
                        </div>
                        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-center flex flex-col justify-center">
                            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Imágenes Evaluadas</p>
                            <p className="text-3xl font-black text-slate-800 dark:text-white">{resultados.imagenes_evaluadas}</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wider mb-4">Valores RCAP Individuales</h4>
                        {resultados.RCAP?.map((val: number, idx: number) => (
                            <div key={idx} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-800/50">
                                <span className="font-medium text-slate-600 dark:text-slate-400">Imagen de prueba #{idx + 1}</span>
                                <span className="font-black text-slate-800 dark:text-white">{val}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
