import React, { useState } from 'react';
import { Microscope, Maximize2, X } from 'lucide-react';
import { BASE_URL } from '../../Config/ConsultaApiBack.tsx';

const STEPS = [
    { title: "Original", path: "entrada", desc: "Imagen base", ext: "jpeg" },
    { title: "Segmentación", path: "segmentada", desc: "Detección conjuntiva", ext: "jpeg" },
    { title: "Área", path: "area", desc: "Ubicación en ojo", ext: "jpeg" },
    { title: "Procesado", path: "png", desc: "Formato digital", ext: "png" },
    { title: "Redimensión", path: "resize", desc: "Ajuste IA", ext: "png" },
];

export const ProcessingSteps = ({ respuesta }) => {
    const [selectedStep, setSelectedStep] = useState(null);

    if (!respuesta?.directorio_procesado) return null;

    const getImgUrl = (step) => {
        // Corregimos la ruta para manejar espacios y slashes de Windows
        const baseDir = (respuesta.directorio_procesado || '').replace(/\\/g, '/');
        const categoria = (respuesta.probable_clase || 'SIN ANEMIA').toUpperCase().replace(/ /g, '%20');
        return `${BASE_URL}${baseDir.startsWith('/') ? '' : '/'}${baseDir}/${step.path}/${categoria}/imagen.${step.ext}`;
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
            <div className="flex items-center gap-2">
                <Microscope className="size-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900">Proceso de Visión Artificial</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {STEPS.map((step) => (
                    <div 
                        key={step.path} 
                        onClick={() => setSelectedStep(step)}
                        className="group cursor-pointer space-y-2"
                    >
                        <div className="relative aspect-square bg-slate-100 rounded-xl overflow-hidden border border-slate-200 transition-all hover:border-rose-400">
                            <img
                                src={getImgUrl(step)}
                                alt={step.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    // Evitamos bucles infinitos si falla el placeholder
                                    if (!e.target.src.includes('placehold.co')) {
                                        e.target.src = `https://placehold.co/400x400/f1f5f9/rose-400?text=${step.title}`;
                                    }
                                }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/10 transition-opacity">
                                <Maximize2 className="text-white size-5" />
                            </div>
                        </div>
                        <span className="block text-[10px] font-bold text-slate-500 uppercase text-center truncate">
                            {step.title}
                        </span>
                    </div>
                ))}
            </div>

            {selectedStep && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedStep(null)}></div>
                    <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full animate-in zoom-in-95">
                        <div className="p-4 border-b flex justify-between items-center bg-slate-50">
                            <div className="text-sm font-bold">{selectedStep.title} - {selectedStep.desc}</div>
                            <button onClick={() => setSelectedStep(null)} className="p-1 hover:bg-slate-200 rounded-full"><X className="size-5"/></button>
                        </div>
                        <div className="p-4 bg-slate-100">
                            <img src={getImgUrl(selectedStep)} className="w-full h-auto rounded-lg shadow-sm" alt="Detalle" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
