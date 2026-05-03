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
                            whatIsIt="Evaluamos si las áreas que el sistema 'ilumina' (mapas de calor) son realmente las que dictan si hay anemia. Es la conexión directa entre la imagen y la decisión del modelo NFNet. Mide qué tan enfocado está el modelo."
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
                                expandedTitle="Precisión Espacial del Mapa de Prominencia"
                                whatIsIt="Es una métrica de validación espacial. Verifica si el 'brillo' del mapa de calor coincide con la anatomía de la conjuntiva segmentada. Nos dice qué tan bien 'atina' el mapa al área correcta, sin distraerse con el resto del ojo."
                                formulaLabel="Fórmula"
                                formulaBlock={<FormulaExactitud />}
                                formulaTerms={[
                                    { name: "VP (Verdaderos Positivos)", text: "Píxeles donde tanto la conjuntiva como el mapa de calor coinciden (Intersección)." },
                                    { name: "FP (Falsos Positivos)", text: "Píxeles donde el modelo 'prestó atención' pero que están fuera de la conjuntiva (distracción)." }
                                ]}
                                interpretations={pInterpretations}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
