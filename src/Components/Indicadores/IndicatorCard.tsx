import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

interface Interpretation {
    min: number;
    max: number;
    label: string;
    desc: string;
    colorClass: string;
}

interface IndicatorCardProps {
    title: string;
    subtitle: string;
    value: number;
    unit?: string;
    expandedTitle: string;
    whatIsIt: string;
    formulaLabel: string;
    formulaBlock: React.ReactNode;
    formulaTerms: { name: string; text: string }[];
    interpretations: Interpretation[];
}

export const IndicatorCard: React.FC<IndicatorCardProps> = ({
    title, subtitle, value, unit, expandedTitle, whatIsIt, formulaLabel, formulaBlock, formulaTerms, interpretations
}) => {
    const [expanded, setExpanded] = useState(false);

    // Buscar el rango donde encaja el valor (si supera el max, tomamos el último)
    const currentInt = interpretations.find(i => value >= i.min && value <= i.max) 
                    || interpretations[interpretations.length - 1];

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-all duration-300">
            {/* Cabecera / Resumen */}
            <div 
                className="p-4 flex justify-between items-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"
                onClick={() => setExpanded(!expanded)}
            >
                <div>
                    <span className="font-bold text-slate-700 dark:text-slate-200 block">{title}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">
                        {value} {unit}
                    </span>
                    {expanded ? <ChevronUp className="size-5 text-slate-400" /> : <ChevronDown className="size-5 text-slate-400" />}
                </div>
            </div>

            {/* Contenido Expandido */}
            {expanded && (
                <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 animate-in fade-in slide-in-from-top-2">
                    <div className="mb-4">
                        <h5 className="font-bold text-indigo-700 dark:text-indigo-400 text-sm mb-1">{expandedTitle}</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            {whatIsIt}
                        </p>
                    </div>

                    <div className="mb-5 bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-4">{formulaLabel}</span>
                        
                        <div className="flex justify-center items-center py-4 text-slate-800 dark:text-slate-200 font-serif text-lg overflow-x-auto">
                            {formulaBlock}
                        </div>

                        <div className="mt-4 space-y-2 border-t border-slate-100 dark:border-slate-700 pt-4">
                            {formulaTerms.map((term, idx) => (
                                <p key={idx} className="text-xs text-slate-600 dark:text-slate-400">
                                    <strong className="text-slate-800 dark:text-slate-200">{term.name}:</strong> {term.text}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2 mb-3">
                            <Info className="size-4 text-slate-400" />
                            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Interpretación de tu resultado ({value} {unit})</span>
                        </div>
                        <div className={`p-4 rounded-lg border ${currentInt.colorClass}`}>
                            <p className="font-bold text-sm mb-1">{currentInt.label}</p>
                            <p className="text-xs opacity-90">{currentInt.desc}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
