import React, { useState } from 'react';
import { Eye, Maximize2, X } from 'lucide-react';
import { BASE_URL } from '../../Config/ConsultaApiBack';
import { AnalisisRespuesta, Step } from '../../Types/Anemia';

const SMOOTHGRAD_STEPS: Step[] = [
    { title: "Original", path: "entrada", desc: "Imagen de entrada", ext: "jpeg", filename: "imagen" },
    { title: "Área de Interés", path: "area", desc: "Contorno detectado", ext: "jpeg", filename: "imagen" },
    { title: "Mapa de Calor", path: "explicabilidad", desc: "Zonas de atención IA", ext: "jpeg", filename: "heatmap" },
    { title: "Foco Original", path: "explicabilidad", desc: "Atención sobre original", ext: "jpeg", filename: "overlay" },
    { title: "Foco + Contorno", path: "explicabilidad", desc: "Atención con área resaltada", ext: "jpeg", filename: "overlay_delineado" },
];

export const SmoothGradSteps: React.FC<{ respuesta: AnalisisRespuesta }> = ({ respuesta }) => {
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
        const filename = step.filename || 'imagen';
        return `${BASE_URL}/${baseDir}/${step.path}/${folderClase}/${filename}.${step.ext}`;
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-colors duration-300 mt-6">
            <div className="flex items-center gap-2 mb-6 text-slate-900 dark:text-white">
                <Eye className="size-5 text-purple-600" />
                <h3 className="text-lg font-bold">Explicabilidad del Modelo (SmoothGrad)</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {SMOOTHGRAD_STEPS.map((step) => (
                    <div key={step.title} onClick={() => setSelectedStep(step)} className="group cursor-pointer">
                        <div className="relative aspect-square bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-purple-400 transition-all">
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
                        <span className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase text-center mt-2 truncate">{step.title}</span>
                    </div>
                ))}
            </div>

            {selectedStep && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedStep(null)}>
                    <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full" onClick={e => e.stopPropagation()}>
                        <div className="p-4 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800">
                            <div className="text-sm font-bold dark:text-white">{selectedStep.title} - {selectedStep.desc}</div>
                            <button onClick={() => setSelectedStep(null)} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full dark:text-white"><X className="size-5"/></button>
                        </div>
                        <div className="p-4 bg-slate-100 dark:bg-slate-950 text-center">
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
