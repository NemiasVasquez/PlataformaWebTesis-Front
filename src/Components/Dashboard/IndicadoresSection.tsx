import React from 'react';
import { Activity } from 'lucide-react';
import { AnalisisRespuesta } from '../../Types/Anemia';
import { IndicatorCard } from '../Indicadores/IndicatorCard';
import * as Data from './IndicadoresData';

export const IndicadoresSection: React.FC<{ respuesta: AnalisisRespuesta }> = ({ respuesta }) => {
    if (!respuesta || respuesta.rcap === undefined) return null;

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-colors duration-300 mt-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-2 mb-6 text-slate-900 dark:text-white">
                <Activity className="size-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-lg font-bold">Métricas de Explicabilidad</h3>
            </div>

            <div className="space-y-6">
                {/* SECCIÓN 1: VALIDACIÓN ESPACIAL */}
                <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
                        Validación Espacial (SmoothGrad)
                    </h4>

                    <div className="grid gap-4">
                        <IndicatorCard
                            title="a) Nivel de Detalle (RCAP)"
                            subtitle="¿El modelo mira la zona correcta?"
                            value={respuesta.rcap}
                            expandedTitle="RCAP (Relación de Concentración)"
                            whatIsIt="Mide si el modelo se concentra en la conjuntiva para decidir o si se distrae con el fondo de la imagen."
                            formulaLabel="Fórmula RCAP"
                            formulaBlock={<Data.FormulaVisual />}
                            formulaTerms={[
                                { name: "∑ M_pk", text: "Importancia dentro de la conjuntiva." },
                                { name: "σ", text: "Confianza del modelo en esa zona." }
                            ]}
                            interpretations={Data.rcapInterpretations}
                        />

                        {respuesta.exactitud !== undefined && (
                            <IndicatorCard
                                title="b) Precisión de Enfoque (P)"
                                subtitle="¿Qué tan limpio es el mapa de calor?"
                                value={respuesta.exactitud}
                                unit="%"
                                expandedTitle="Precisión Espacial (P)"
                                whatIsIt="Verifica si el brillo del mapa de calor está perfectamente enmarcado dentro de la conjuntiva segmentada."
                                formulaLabel="Fórmula P"
                                formulaBlock={<Data.FormulaExactitud />}
                                formulaTerms={[
                                    { name: "VP", text: "Aciertos dentro de la zona clínica." },
                                    { name: "FP", text: "Atención fuera de la conjuntiva." }
                                ]}
                                interpretations={Data.pInterpretations}
                            />
                        )}

                        {respuesta.tiempo !== undefined && (
                            <IndicatorCard
                                title="c) Velocidad de Respuesta (T)"
                                subtitle="Tiempo de procesamiento"
                                value={respuesta.tiempo}
                                unit="Seg"
                                expandedTitle="Rendimiento (T)"
                                whatIsIt="Segundos que tarda la IA en generar la explicación visual para el médico."
                                formulaLabel="Promedio"
                                formulaBlock={<Data.FormulaTiempo />}
                                formulaTerms={[
                                    { name: "X", text: "Tiempo por imagen." },
                                    { name: "n", text: "Total evaluaciones." }
                                ]}
                                interpretations={Data.tInterpretations}
                            />
                        )}
                    </div>
                </div>

                {/* SECCIÓN 2: ROBUSTEZ Y CONSENSO */}
                <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
                        Estabilidad y Consenso (NFNet)
                    </h4>

                    <div className="grid gap-4">
                        {respuesta.robustez !== undefined && (
                            <IndicatorCard
                                title="a) Robustez de los Resultados (RG)"
                                subtitle="Firmeza de la decisión"
                                value={respuesta.robustez}
                                expandedTitle="Robustez de Predicción (RG)"
                                whatIsIt="Mide qué tan difícil es engañar al modelo. Evalúa si la decisión de 'Anemia' es sólida frente a cambios mínimos."
                                formulaLabel="Métrica de Distancia"
                                formulaBlock={<Data.FormulaRobustez />}
                                formulaTerms={[
                                    { name: "Ψ", text: "Puntuación de la clase." },
                                    { name: "∇Ψ", text: "Gradiente de la imagen." }
                                ]}
                                interpretations={Data.rgInterpretations}
                            />
                        )}

                        {respuesta.transparencia !== undefined && (
                            <IndicatorCard
                                title="b) Visibilidad de Características Claras (NT)"
                                subtitle="SHAP vs SmoothGrad"
                                value={respuesta.transparencia}
                                unit="%"
                                expandedTitle="Transparencia de Diagnóstico (NT)"
                                whatIsIt="Mide si dos técnicas de IA diferentes están de acuerdo en qué parte del ojo indica la anemia."
                                formulaLabel="Intersección"
                                formulaBlock={<Data.FormulaTransparencia />}
                                formulaTerms={[
                                    { name: "A ∩ B", text: "Acuerdo entre SHAP y SmoothGrad." },
                                    { name: "B", text: "Base de comparación." }
                                ]}
                                interpretations={Data.ntInterpretations}
                            />
                        )}

                        {respuesta.sensibilidad !== undefined && (
                            <IndicatorCard
                                title="c) Sensibilidad de la Explicabilidad (S)"
                                subtitle="Resistencia del mapa visual"
                                value={respuesta.sensibilidad}
                                expandedTitle="Sensibilidad (S)"
                                whatIsIt="Mide si el mapa de calor se mantiene igual ante ruidos técnicos en la captura de la foto."
                                formulaLabel="Derivada"
                                formulaBlock={<Data.FormulaSensibilidad />}
                                formulaTerms={[
                                    { name: "Φ", text: "Mapa de calor original." },
                                    { name: "ε", text: "Ruido técnico aplicado." }
                                ]}
                                interpretations={Data.sInterpretations}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
