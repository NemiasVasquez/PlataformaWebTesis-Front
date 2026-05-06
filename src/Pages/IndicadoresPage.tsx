import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { consultaApiBack } from '../Config/ConsultaApiBack';
import { BrainCircuit, PlayCircle, Activity, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { IndicatorCard } from '../Components/Indicadores/IndicatorCard';
import * as Data from '../Components/Dashboard/IndicadoresData';

export const IndicadoresPage: React.FC = () => {
    const [cargando, setCargando] = useState(false);
    const [resultados, setResultados] = useState<any>(null);
    const [verDetalles, setVerDetalles] = useState(false);

    const ejecutarIndicadores = async () => {
        try {
            setCargando(true);
            toast.loading("Calculando métricas globales (SmoothGrad + NFNet)...", { id: 'ind' });
            
            const formData = new FormData();
            const res = await consultaApiBack<any>('/modelo/evaluar_indicadores/', 'POST', formData, true);
            
            setResultados(res);
            toast.success("Análisis de lote completado", { id: 'ind' });
        } catch (error: any) {
            toast.error(error.message || "Error al calcular", { id: 'ind' });
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
            {/* ENCABEZADO Y ACCIÓN */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl text-indigo-600 dark:text-indigo-400">
                            <Activity className="size-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tight dark:text-white">Análisis Global de Explicabilidad</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                                Evaluación estadística del dataset de validación
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={ejecutarIndicadores}
                        disabled={cargando}
                        className="py-4 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-3 text-lg disabled:opacity-50 shadow-lg shadow-indigo-200 dark:shadow-none"
                    >
                        {cargando ? <BrainCircuit className="size-6 animate-spin" /> : <PlayCircle className="size-6" />}
                        {cargando ? 'PROCESANDO...' : 'EJECUTAR EVALUACIÓN'}
                    </button>
                </div>

                {!resultados && (
                    <div className="mt-8 grid md:grid-cols-3 gap-4">
                        {[
                            { t: "Validación Visual", d: "Mide si el modelo enfoca la conjuntiva." },
                            { t: "Firmeza de IA", d: "Evalúa estabilidad ante ruido y cambios." },
                            { t: "Consenso", d: "Compara SHAP vs SmoothGrad." }
                        ].map((item, i) => (
                            <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-xs uppercase mb-1">{item.t}</h4>
                                <p className="text-[11px] text-slate-500">{item.d}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {resultados && (
                <div className="space-y-8 animate-in zoom-in-95 duration-500">
                    {/* RESUMEN RÁPIDO */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Imágenes Analizadas</p>
                            <p className="text-3xl font-black text-slate-800 dark:text-white">{resultados.procesadas}</p>
                        </div>
                        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tiempo Promedio</p>
                            <p className="text-3xl font-black text-slate-800 dark:text-white">{resultados.t_promedio}s</p>
                        </div>
                        <div className="p-6 bg-indigo-600 rounded-2xl text-center shadow-lg shadow-indigo-100 dark:shadow-none col-span-2">
                            <p className="text-[10px] font-black text-indigo-100 uppercase tracking-widest mb-1">Calidad General (D)</p>
                            <p className="text-4xl font-black text-white">{resultados.d_metric}%</p>
                        </div>
                    </div>

                    {/* GRID DE MÉTRICAS PRINCIPALES */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <IndicatorCard
                            title="1. Nivel de Detalle (RCAP)"
                            subtitle="¿El modelo mira la zona correcta?"
                            value={resultados.d_metric}
                            expandedTitle="RCAP (Relación de Concentración)"
                            whatIsIt="Representa qué tanto de la atención del modelo se concentra realmente en las zonas clínicas del ojo."
                            formulaLabel="Fórmula RCAP"
                            formulaBlock={<Data.FormulaVisual />}
                            formulaTerms={[
                                { name: "∑ M_pk", text: "Importancia dentro de la conjuntiva." },
                                { name: "σ", text: "Confianza del modelo en esa zona." }
                            ]}
                            interpretations={Data.rcapInterpretations}
                        />
                        <IndicatorCard
                            title="2. Exactitud de Áreas (P)"
                            subtitle="Puntería de los mapas de calor"
                            value={resultados.p_metric}
                            unit="%"
                            expandedTitle="Exactitud Espacial (P)"
                            whatIsIt="Mide qué porcentaje de los mapas de calor caen exactamente dentro de la conjuntiva."
                            formulaLabel="Fórmula P"
                            formulaBlock={<Data.FormulaExactitud />}
                            formulaTerms={[
                                { name: "VP", text: "Aciertos dentro de la zona clínica." },
                                { name: "FP", text: "Atención fuera de la conjuntiva." }
                            ]}
                            interpretations={Data.pInterpretations}
                        />
                        <IndicatorCard
                            title="3. Robustez de los Resultados (RG)"
                            subtitle="Seguridad del modelo ante cambios"
                            value={resultados.rg_metric}
                            expandedTitle="Robustez de Predicción (RG)"
                            whatIsIt="Evalúa qué tan firme es la decisión de la red NFNet frente a perturbaciones."
                            formulaLabel="Métrica RG"
                            formulaBlock={<Data.FormulaRobustez />}
                            formulaTerms={[
                                { name: "Ψ", text: "Puntuación de la clase." },
                                { name: "∇Ψ", text: "Gradiente de la imagen." }
                            ]}
                            interpretations={Data.rgInterpretations}
                        />
                        <IndicatorCard
                            title="4. Visibilidad de Características Claras (NT)"
                            subtitle="Acuerdo entre SHAP y SmoothGrad"
                            value={resultados.nt_metric}
                            unit="%"
                            expandedTitle="Transparencia de Diagnóstico (NT)"
                            whatIsIt="Mide si diferentes algoritmos de explicabilidad llegan a la misma conclusión visual."
                            formulaLabel="Intersección NT"
                            formulaBlock={<Data.FormulaTransparencia />}
                            formulaTerms={[
                                { name: "A ∩ B", text: "Acuerdo entre SHAP y SmoothGrad." },
                                { name: "B", text: "Base de comparación." }
                            ]}
                            interpretations={Data.ntInterpretations}
                        />
                        <IndicatorCard
                            title="5. Sensibilidad de la Explicabilidad (S)"
                            subtitle="Firmeza visual ante ruidos"
                            value={resultados.s_metric}
                            expandedTitle="Sensibilidad (S)"
                            whatIsIt="Mide si los mapas de calor son estables o si cambian erráticamente con el ruido técnico."
                            formulaLabel="Derivada"
                            formulaBlock={<Data.FormulaSensibilidad />}
                            formulaTerms={[
                                { name: "Φ", text: "Mapa de calor original." },
                                { name: "ε", text: "Ruido técnico aplicado." }
                            ]}
                            interpretations={Data.sInterpretations}
                        />
                        <div className="bg-slate-900 dark:bg-indigo-950 p-6 rounded-3xl flex flex-col items-center justify-center text-center text-white border border-slate-800">
                             <Info className="size-8 mb-3 text-indigo-400" />
                             <h4 className="font-bold uppercase text-xs tracking-tighter mb-2">Nota del Sistema</h4>
                             <p className="text-[11px] opacity-70 leading-relaxed">
                                Estas métricas son fundamentales para la validación clínica de la tesis. 
                                Un sistema con **S bajo** y **NT alto** garantiza explicaciones confiables.
                             </p>
                        </div>
                    </div>

                    {/* DESGLOSE INDIVIDUAL */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                        <button 
                            onClick={() => setVerDetalles(!verDetalles)}
                            className="w-full p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
                                    <BrainCircuit className="size-5" />
                                </div>
                                <h3 className="text-lg font-bold dark:text-white">Ver Desglose por Imagen</h3>
                            </div>
                            {verDetalles ? <ChevronUp /> : <ChevronDown />}
                        </button>

                        {verDetalles && (
                            <div className="p-6 border-t border-slate-100 dark:border-slate-800 overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead>
                                        <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-slate-800">
                                            <th className="pb-4"># Imagen</th>
                                            <th className="pb-4 text-center">RCAP</th>
                                            <th className="pb-4 text-center">P (%)</th>
                                            <th className="pb-4 text-center">RG</th>
                                            <th className="pb-4 text-center">NT (%)</th>
                                            <th className="pb-4 text-center">S</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                        {resultados.rcap_individuales?.map((_: any, i: number) => (
                                            <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                                <td className="py-4 font-bold text-slate-500">Prueba #{i+1}</td>
                                                <td className="py-4 text-center font-black">{resultados.rcap_individuales[i]}</td>
                                                <td className="py-4 text-center font-black">{resultados.p_individuales?.[i]}%</td>
                                                <td className="py-4 text-center font-black text-indigo-500">{resultados.rg_individuales?.[i]}</td>
                                                <td className="py-4 text-center font-black text-emerald-500">{resultados.nt_individuales?.[i]}%</td>
                                                <td className="py-4 text-center font-black text-rose-500">{resultados.s_individuales?.[i]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
