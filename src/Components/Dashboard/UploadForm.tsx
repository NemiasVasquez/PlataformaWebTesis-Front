import React from 'react';
import { RenderInput } from '../../Elements/RenderInput';
import { Button } from '../button';
import { BrainCircuit, RefreshCcw, Info } from 'lucide-react';

interface Props {
    onUpload: (e: React.FormEvent) => void;
    setForm: React.Dispatch<React.SetStateAction<any>>;
    form: any;
    cargando: boolean;
    onCancel: () => void;
}

export const UploadForm: React.FC<Props> = ({ onUpload, setForm, form, cargando, onCancel }) => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-colors duration-300">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Nueva Evaluación</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1">
                    <Info className="size-3.5" /> Suba una imagen clara de la conjuntiva
                </p>
            </div>

            <form onSubmit={onUpload} className="space-y-6">
                <RenderInput
                    widthFile="100%" heightFile="240px" type="file"
                    accept=".jpg,.png,.jpeg" name="img" label="Captura de Conjuntiva"
                    setForm={setForm} className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl"
                />

                <div className="flex gap-3">
                    <Button type="button" onClick={onCancel} variant="cancelar" disabled={cargando} className="flex-1 py-4 text-sm font-semibold">
                        Limpiar
                    </Button>
                    <Button type="submit" showIcon={false} variant="success" disabled={cargando} className="flex-[2] py-4 text-sm font-semibold shadow-sm">
                        {cargando ? (
                            <span className="flex items-center justify-center gap-2">
                                <RefreshCcw className="size-4 animate-spin" /> Procesando
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <BrainCircuit className="size-4 rotate-90" /> EJECUTAR IA
                            </span>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};
