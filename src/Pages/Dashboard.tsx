import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { consultaApiBack } from '../Config/ConsultaApiBack';
import { UploadForm } from '../Components/Dashboard/UploadForm';
import { ResultSummary } from '../Components/Dashboard/ResultSummary';
import { ProcessingSteps } from '../Components/Dashboard/ProcessingSteps';
import { BrainCircuit, Activity, AlertCircle } from 'lucide-react';
import { AnalisisRespuesta } from '../Types/Anemia';

const Dashboard: React.FC = () => {
    const [form, setForm] = useState<any>({});
    const [respuesta, setRespuesta] = useState<AnalisisRespuesta | null>(null);
    const [cargando, setCargando] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form?.img) return toast.error('Por favor, selecciona una imagen');
        
        try {
            const formData = new FormData();
            formData.append('imagen', form.img);
            setCargando(true);
            const resultado = await consultaApiBack<AnalisisRespuesta>('/modelo/evaluar_imagen_anemia/', 'POST', formData, true);
            setRespuesta(resultado);
            setTimeout(() => document.getElementById('res')?.scrollIntoView({ behavior: 'smooth' }), 100);
        } catch (error: any) {
            setRespuesta({ error: error.message } as any);
        } finally {
            setCargando(false);
        }
    };

    const handleCancelar = () => {
        setForm({});
        setRespuesta(null);
    };

    return (
        <div className="min-h-screen bg-[#fafafa] font-sans pb-20">
            <Toaster position="top-right" />
            <nav className="bg-white border-b sticky top-0 z-50 px-6 py-4">
                <div className="max-w-6xl mx-auto flex items-center gap-2">
                    <Activity className="text-rose-600" />
                    <span className="font-extrabold text-xl tracking-tight">Anemia<span className="text-rose-600">IA</span></span>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-[400px,1fr] gap-8">
                <div className="space-y-6">
                    <UploadForm onUpload={handleSubmit} setForm={setForm} form={form} cargando={cargando} onCancel={handleCancelar} />
                    <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl flex gap-3">
                        <AlertCircle className="size-5 text-rose-500 shrink-0" />
                        <p className="text-[10px] text-rose-700 leading-normal">
                            Uso referencial. Los resultados deben ser validados por un profesional médico.
                        </p>
                    </div>
                </div>

                <div id="res" className="space-y-6">
                    {!respuesta && !cargando ? (
                        <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-dashed border-slate-300 text-slate-400">
                             <BrainCircuit className="size-10 mb-2 opacity-20" />
                             <p className="text-sm font-medium">Esperando procesamiento de imagen...</p>
                        </div>
                    ) : (
                        <div className="animate-in fade-in duration-500 space-y-6">
                            {respuesta?.error ? (
                                <div className="p-4 bg-rose-50 text-rose-600 rounded-xl border border-rose-100 text-sm font-medium">{respuesta.error}</div>
                            ) : (
                                respuesta && (
                                    <>
                                        <ResultSummary respuesta={respuesta} />
                                        <ProcessingSteps respuesta={respuesta} />
                                    </>
                                )
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
