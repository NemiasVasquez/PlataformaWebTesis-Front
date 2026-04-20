import React, { useState } from 'react';
import { Microscope, Maximize2, X } from 'lucide-react';
import { BASE_URL } from '../../Config/ConsultaApiBack';
import { AnalisisRespuesta, Step } from '../../Types/Anemia';

const STEPS: Step[] = [
    { title: "Original", path: "entrada", desc: "Imagen base", ext: "jpeg" },
    { title: "Segmentación", path: "segmentada", desc: "Detección conjuntiva", ext: "jpeg" },
    { title: "Área", path: "area", desc: "Ubicación en ojo", ext: "jpeg" },
    { title: "Procesado", path: "png", desc: "Formato digital", ext: "png" },
    { title: "Redimensión", path: "resize", desc: "Ajuste IA", ext: "png" },
];

export const ProcessingSteps: React.FC<{ respuesta: AnalisisRespuesta }> = ({ respuesta }) => {
    const [selectedStep, setSelectedStep] = useState<Step | null>(null);

    const getImgUrl = (step: Step) => {
        const baseDir = (respuesta.directorio_procesado || '').replace(/\\/g, '/');
        let folderName = respuesta.categoria || '';
        
        if (!folderName) {
            const isAnemia = (respuesta.probable_clase || '').toLowerCase().includes('con') && 
                            !(respuesta.probable_clase || '').toLowerCase().includes('sin');
            folderName = isAnemia ? 'CON ANEMIA' : 'SIN ANEMIA';
        }
        
        const folderClase = folderName.toUpperCase().replace(/ /g, '%20');
        // Quitamos Date.now() del render directo para evitar bucles de carga
        return `${BASE_URL}/${baseDir}/${step.path}/${folderClase}/imagen.${step.ext}`;
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-6 text-slate-900">
                <Microscope className="size-5 text-blue-600" />
                <h3 className="text-lg font-bold">Proceso de Visión Artificial</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {STEPS.map((step) => (
                    <div key={step.path} onClick={() => setSelectedStep(step)} className="group cursor-pointer">
                        <div className="relative aspect-square bg-slate-50 rounded-xl overflow-hidden border border-slate-200 hover:border-rose-400 transition-all">
                            <img 
                                src={getImgUrl(step)} 
                                alt={step.title} 
                                className="w-full h-full object-cover" 
                                crossOrigin="anonymous" 
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/10 transition-opacity">
                                <Maximize2 className="text-white size-5" />
                            </div>
                        </div>
                        <span className="block text-[10px] font-bold text-slate-500 uppercase text-center mt-2 truncate">{step.title}</span>
                    </div>
                ))}
            </div>

            {selectedStep && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedStep(null)}>
                    <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full" onClick={e => e.stopPropagation()}>
                        <div className="p-4 border-b flex justify-between items-center bg-slate-50">
                            <div className="text-sm font-bold">{selectedStep.title} - {selectedStep.desc}</div>
                            <button onClick={() => setSelectedStep(null)} className="p-1 hover:bg-slate-200 rounded-full"><X className="size-5"/></button>
                        </div>
                        <div className="p-4 bg-slate-100 text-center">
                            <img 
                                src={getImgUrl(selectedStep)} 
                                className="max-w-full h-auto mx-auto rounded-lg" 
                                alt="Detalle" 
                                crossOrigin="anonymous" 
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
