import React from 'react';

// --- FÓRMULAS ---

export const FormulaVisual = () => (
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

export const FormulaExactitud = () => (
    <div className="flex items-center gap-2 whitespace-nowrap">
        <span>P = </span>
        <div className="flex flex-col items-center text-sm mx-2">
            <span className="border-b border-current px-1">VP</span>
            <span>VP + FP</span>
        </div>
        <span>× 100</span>
    </div>
);

export const FormulaTiempo = () => (
    <div className="flex items-center gap-2 whitespace-nowrap">
        <span>T = </span>
        <div className="flex flex-col items-center text-sm mx-2">
            <span className="border-b border-current px-1">∑ X</span>
            <span>n</span>
        </div>
    </div>
);

export const FormulaRobustez = () => (
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

export const FormulaTransparencia = () => (
    <div className="flex items-center gap-2 whitespace-nowrap">
        <span>t<sub>i</sub> = </span>
        <div className="flex flex-col items-center text-sm mx-2">
            <span className="border-b border-current px-1">|A ∩ B|</span>
            <span>|B|</span>
        </div>
        <span>× 100</span>
    </div>
);

export const FormulaSensibilidad = () => (
    <div className="flex items-center gap-2 whitespace-nowrap">
        <span>[∇<sub>x</sub>Φ]<sub>j</sub> = </span>
        <div className="flex flex-col items-center text-sm mx-2">
            <span className="border-b border-current px-1">Φ(f(x + εe<sub>j</sub>)) - Φ(f(x))</span>
            <span>ε</span>
        </div>
    </div>
);

// --- INTERPRETACIONES ---

export const rcapInterpretations = [
    { min: 0, max: 0.2, label: "Bajo Enfoque", desc: "El modelo se distrae con el fondo.", colorClass: "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40" },
    { min: 0.21, max: 0.5, label: "Enfoque Correcto", desc: "La conjuntiva es la base del diagnóstico.", colorClass: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/40" },
    { min: 0.51, max: 1.0, label: "Enfoque Excelente", desc: "Precisión visual máxima en la zona de interés.", colorClass: "bg-green-50 text-green-800 border-green-200 dark:bg-green-950/40" }
];

export const pInterpretations = [
    { min: 0, max: 50, label: "Mapa Sucio", desc: "Mucha atención fuera de la conjuntiva.", colorClass: "bg-rose-50 text-rose-800 border-rose-200" },
    { min: 50.1, max: 80, label: "Mapa Limpio", desc: "Buena puntería visual del modelo.", colorClass: "bg-blue-50 text-blue-800 border-blue-200" },
    { min: 80.1, max: 100, label: "Mapa Perfecto", desc: "Atención total dentro de la zona clínica.", colorClass: "bg-green-50 text-green-800 border-green-200" }
];

export const tInterpretations = [
    { min: 0, max: 1.0, label: "Instantáneo", desc: "Resultados en tiempo real.", colorClass: "bg-green-50 text-green-800 border-green-200" },
    { min: 1.1, max: 3.0, label: "Rápido", desc: "Velocidad aceptable para clínica.", colorClass: "bg-blue-50 text-blue-800 border-blue-200" },
    { min: 3.1, max: 999, label: "Lento", desc: "Puede causar demora en consulta.", colorClass: "bg-amber-50 text-amber-800 border-amber-200" }
];

export const rgInterpretations = [
    { min: 0, max: 1.0, label: "Inestable", desc: "La predicción podría cambiar con poco ruido.", colorClass: "bg-rose-50 text-rose-800 border-rose-200" },
    { min: 1.1, max: 2.5, label: "Estable", desc: "Diagnóstico consistente y seguro.", colorClass: "bg-blue-50 text-blue-800 border-blue-200" },
    { min: 2.6, max: 999, label: "Muy Seguro", desc: "El modelo NFNet no tiene dudas.", colorClass: "bg-green-50 text-green-800 border-green-200" }
];

export const ntInterpretations = [
    { min: 0, max: 40, label: "Desacuerdo", desc: "Las IAs no coinciden en lo que ven.", colorClass: "bg-rose-50 text-rose-800 border-rose-200" },
    { min: 40.1, max: 75, label: "Consenso", desc: "Diferentes técnicas ven patrones similares.", colorClass: "bg-blue-50 text-blue-800 border-blue-200" },
    { min: 75.1, max: 100, label: "Total Acuerdo", desc: "Validación cruzada exitosa entre algoritmos.", colorClass: "bg-green-50 text-green-800 border-green-200" }
];

export const sInterpretations = [
    { min: 0, max: 0.1, label: "Firme", desc: "El mapa no cambia por ruidos técnicos.", colorClass: "bg-green-50 text-green-800 border-green-200" },
    { min: 0.11, max: 0.3, label: "Moderada", desc: "Pequeña variación visual ante ruidos.", colorClass: "bg-blue-50 text-blue-800 border-blue-200" },
    { min: 0.31, max: 999, label: "Sensible", desc: "Explicación visual algo inestable.", colorClass: "bg-rose-50 text-rose-800 border-rose-200" }
];
