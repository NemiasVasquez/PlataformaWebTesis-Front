import React from 'react';
import { Activity } from 'lucide-react';
import { AnalisisRespuesta } from '../../Types/Anemia';
import { IndicatorCard } from '../Indicadores/IndicatorCard';

const FormulaVisual = () => (
    <div className="flex items-center gap-2 whitespace-nowrap">
        <span>RCAP(M) = </span>
        <div className="flex flex-col items-center text-sm">
            <span className="border-b border-current px-1">1</span>
            <span>J</span>
        </div>
        <div className="flex flex-col items-center justify-center -mt-1 mx-1">
            <span className="text-xs">j</span>
            <span className="text-2xl leading-none">∑</span>
            <span className="text-xs">k=1</span>
        </div>
        <span className="text-3xl font-light">[</span>
        <span className="text-3xl font-light">(</span>
        <div className="flex flex-col items-center text-sm mx-1">
            <span className="border-b border-current px-1">∑ M<sub>pk</sub></span>
            <span>∑ M</span>
        </div>
        <span className="text-3xl font-light">)</span>
        <span className="mx-1">×</span>
        <span>σ(f<sub>c</sub>(I<sub>pk</sub>))</span>
        <span className="text-3xl font-light">]</span>
    </div>
);

const rcapInterpretations = [
    {
        min: 0.0,
        max: 0.2,
        label: "Baja precisión visual",
        desc: "El modelo podría estar distraído por ruido visual externo. La zona de interés no define completamente la decisión final.",
        colorClass: "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900"
    },
    {
        min: 0.2001,
        max: 0.5,
        label: "Precisión moderada/buena (Localización Efectiva)",
        desc: "El sistema confirma que la zona de la conjuntiva segmentada contiene la información necesaria para el diagnóstico, con un nivel de ruido visual bajo.",
        colorClass: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900"
    },
    {
        min: 0.5001,
        max: 1.0,
        label: "Alta precisión visual",
        desc: "Excelente. La zona resaltada por el mapa es casi totalmente responsable de la predicción y carece de ruido visual relevante.",
        colorClass: "bg-green-50 text-green-800 border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-900"
    }
];

const pInterpretations = [
    {
        min: 0.0,
        max: 50.0,
        label: "Baja exactitud (Puntería pobre)",
        desc: "El modelo se está distrayendo mucho con zonas fuera de la conjuntiva (falsos positivos). La explicación visual es difusa.",
        colorClass: "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900"
    },
    {
        min: 50.01,
        max: 80.0,
        label: "Exactitud moderada/buena",
        desc: "Buena coincidencia general. La mayor parte de la atención del modelo cae correctamente dentro de la conjuntiva.",
        colorClass: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900"
    },
    {
        min: 80.01,
        max: 100.0,
        label: "Alta exactitud (Excelente puntería)",
        desc: "Casi todo lo que el modelo considera importante está perfectamente enmarcado dentro de la conjuntiva. Explicación muy limpia.",
        colorClass: "bg-green-50 text-green-800 border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-900"
    }
];

const FormulaExactitud = () => (
    <div className="flex items-center gap-2 whitespace-nowrap">
        <span>P = </span>
        <div className="flex flex-col items-center text-sm mx-2">
            <span className="border-b border-current px-1">VP</span>
            <span>VP + FP</span>
        </div>
        <span>× 100</span>
    </div>
);

const tInterpretations = [
    {
        min: 0.0,
        max: 1.0,
        label: "Excelente (Alta velocidad)",
        desc: "El sistema genera la explicación en menos de un segundo. Óptimo para uso fluido en la clínica.",
        colorClass: "bg-green-50 text-green-800 border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-900"
    },
    {
        min: 1.001,
        max: 3.0,
        label: "Moderado (Aceptable)",
        desc: "Tiempo razonable. El médico esperará pocos segundos antes de ver la validación del diagnóstico.",
        colorClass: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900"
    },
    {
        min: 3.001,
        max: 999.0,
        label: "Lento (Posible retraso)",
        desc: "Podría percibirse como lento en consultorios de alta demanda.",
        colorClass: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900"
    }
];

const rgInterpretations = [
    {
        min: 0.0,
        max: 1.0,
        label: "Baja Robustez (Sensible)",
        desc: "El modelo es sensible; pequeños cambios en la imagen podrían alterar el mapa de prominencia o la predicción.",
        colorClass: "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900"
    },
    {
        min: 1.001,
        max: 2.5,
        label: "Robustez Moderada",
        desc: "Estabilidad aceptable. El mapa de calor es consistente pero existe un margen de sensibilidad ante perturbaciones.",
        colorClass: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900"
    },
    {
        min: 2.501,
        max: 999.0,
        label: "Alta Robustez (Seguro)",
        desc: "El modelo NFNet es muy seguro de su decisión y el mapa de calor es altamente confiable y estable.",
        colorClass: "bg-green-50 text-green-800 border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-900"
    }
];

const ntInterpretations = [
    {
        min: 0.0,
        max: 40.0,
        label: "Baja Transparencia (Desacuerdo)",
        desc: "SHAP y SmoothGrad no coinciden en las zonas relevantes. El diagnóstico podría basarse en características inconsistentes.",
        colorClass: "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900"
    },
    {
        min: 40.01,
        max: 75.0,
        label: "Transparencia Moderada",
        desc: "Existe un consenso general entre algoritmos sobre qué zonas de la conjuntiva son importantes para el diagnóstico.",
        colorClass: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900"
    },
    {
        min: 75.01,
        max: 100.0,
        label: "Alta Transparencia (Consenso)",
        desc: "Múltiples técnicas de IA coinciden plenamente.",
        colorClass: "bg-green-50 text-green-800 border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-900"
    }
];

const FormulaTiempo = () => (
    <div className="flex items-center gap-2 whitespace-nowrap">
        <span>T = </span>
        <div className="flex flex-col items-center text-sm mx-2">
            <span className="border-b border-current px-1">∑ X</span>
            <span>n</span>
        </div>
    </div>
);

const FormulaRobustez = () => (
    <div className="flex items-center gap-2 whitespace-nowrap">
        <span>ρ(x) = min </span>
        <div className="flex flex-col items-center text-[10px] -ml-2 mr-1">
            <span>j≠i</span>
        </div>
        <div className="flex flex-col items-center text-sm mx-2">
            <span className="border-b border-current px-1">Ψ<sub>i</sub>(x) - Ψ<sub>j</sub>(x)</span>
            <span>||∇Ψ<sub>i</sub>(x) - ∇Ψ<sub>j</sub>(x)||</span>
        </div>
    </div>
);

const FormulaTransparencia = () => (
    <div className="flex items-center gap-2 whitespace-nowrap">
        <span>t<sub>i</sub> = </span>
        <div className="flex flex-col items-center text-sm mx-2">
            <span className="border-b border-current px-1">|A ∩ B|</span>
            <span>|B|</span>
        </div>
        <span>× 100</span>
    </div>
);

export const IndicadoresSection: React.FC<{ respuesta: AnalisisRespuesta }> = ({ respuesta }) => {
    if (!respuesta || respuesta.rcap === undefined) return null;

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-colors duration-300 mt-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-2 mb-6 text-slate-900 dark:text-white">
                <Activity className="size-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-lg font-bold">Indicadores</h3>
            </div>

            <div className="space-y-6">
                <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
                        Técnica SmoothGrad
                    </h4>

                    <div className="grid gap-4">
                        <IndicatorCard
                            title="a) Detalle visual (RCAP)"
                            subtitle="Proporción de intensidad en región importante"
                            value={respuesta.rcap}
                            expandedTitle="Nivel de Detalle del Mapa de Prominencia"
                            whatIsIt="Evaluamos si las áreas que el sistema 'ilumina' (mapas de calor) son las que determinan la presencia de anemia. Es la conexión directa entre la imagen y la decisión del modelo NFNet."
                            formulaLabel="Fórmula"
                            formulaBlock={<FormulaVisual />}
                            formulaTerms={[
                                { name: "Ruido Visual (∑ M_pk / ∑ M)", text: "Mide qué tanta importancia se concentra en la zona segmentada." },
                                { name: "Localización (σ(fc(I_pk)))", text: "Mide la confianza del modelo al ver solo esa parte específica de tu ojo." }
                            ]}
                            interpretations={rcapInterpretations}
                        />

                        {respuesta.exactitud !== undefined && (
                            <IndicatorCard
                                title="b) Exactitud de áreas destacadas (P)"
                                subtitle="Mide qué tan limpia es la explicación visual"
                                value={respuesta.exactitud}
                                unit="%"
                                expandedTitle="Precisión Espacial del Mapa de Prominencia"
                                whatIsIt="Es una métrica de validación espacial. Verifica si el 'brillo' del mapa de calor coincide con la anatomía de la conjuntiva segmentada."
                                formulaLabel="Fórmula"
                                formulaBlock={<FormulaExactitud />}
                                formulaTerms={[
                                    { name: "VP (Verdaderos Positivos)", text: "Píxeles donde tanto la conjuntiva como el mapa de calor coinciden (Intersección)." },
                                    { name: "FP (Falsos Positivos)", text: "Píxeles que ha tomado el modelo pero que están fuera de la conjuntiva." }
                                ]}
                                interpretations={pInterpretations}
                            />
                        )}

                        {respuesta.tiempo !== undefined && (
                            <IndicatorCard
                                title="c) Rendimiento de procesamiento (T)"
                                subtitle="Tiempo que tarda el modelo en generar explicaciones"
                                value={respuesta.tiempo}
                                unit="Seg"
                                expandedTitle="Eficiencia Computacional del Algoritmo"
                                whatIsIt={`Este valor indica los segundos que tarda el modelo en generar las explicaciones.
                                Se utiliza la librería \`time\` nativa de Python.`}
                                formulaLabel="Fórmula de Media Aritmética"
                                formulaBlock={<FormulaTiempo />}
                                formulaTerms={[
                                    { name: "X", text: "Tiempo en segundos para generar el mapa SmoothGrad." },
                                    { name: "n", text: "Número de imágenes." }
                                ]}
                                interpretations={tInterpretations}
                            />
                        )}
                    </div>
                </div>

                <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
                        Explicabilidad en NFNet
                    </h4>

                    <div className="grid gap-4">
                        {respuesta.robustez !== undefined && (
                            <IndicatorCard
                                title="a) Robustez de los resultados (RG)"
                                subtitle="Métrica de estabilidad ante perturbaciones"
                                value={respuesta.robustez}
                                expandedTitle="Robustez de la Predicción (Métrica ρ)"
                                whatIsIt="La resistencia del modelo ante perturbaciones. Evalúa qué tan estables son los mapas de calor frente a otras posibles clases."
                                formulaLabel="Fórmula Académica"
                                formulaBlock={<FormulaRobustez />}
                                formulaTerms={[
                                    { name: "Ψ_i(x)", text: "Puntuación (logit) de la clase predicha." },
                                    { name: "∇Ψ_i(x)", text: "Gradiente de la puntuación respecto a la imagen de entrada." },
                                    { name: "||...||", text: "Norma L2 de la diferencia de gradientes." }
                                ]}
                                interpretations={rgInterpretations}
                            />
                        )}

                        {respuesta.transparencia !== undefined && (
                            <IndicatorCard
                                title="b) Visibilidad de características claras (NT)"
                                subtitle="Consenso entre algoritmos SHAP y SmoothGrad"
                                value={respuesta.transparencia}
                                unit="%"
                                expandedTitle="Grado de Transparencia del Diagnóstico"
                                whatIsIt="Este indicador mide el consenso entre dos algoritmos distintos (SHAP y SmoothGrad). Una coincidencia alta significa que múltiples métodos de IA están de acuerdo en qué parte de la conjuntiva indica anemia."
                                formulaLabel="Cálculo de Coincidencia"
                                formulaBlock={<FormulaTransparencia />}
                                formulaTerms={[
                                    { name: "A ∩ B", text: "Intersección de píxeles relevantes entre SHAP (A) y SmoothGrad (B)." },
                                    { name: "B", text: "Total de píxeles relevantes en SmoothGrad." },
                                    { name: "Leyenda", text: "Coincidencia entre técnicas de explicabilidad." }
                                ]}
                                interpretations={ntInterpretations}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
