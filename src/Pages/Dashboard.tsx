import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { consultaApiBack } from '../Config/ConsultaApiBack';
import { UploadForm } from '../Components/Dashboard/UploadForm';
import { ResultSummary } from '../Components/Dashboard/ResultSummary';
import { ProcessingSteps } from '../Components/Dashboard/ProcessingSteps';
import { ConfigPage } from './ConfigPage';
import { BrainCircuit, Activity, AlertCircle, Sun, Moon, LayoutDashboard, Settings } from 'lucide-react';
import { AnalisisRespuesta } from '../Types/Anemia';

const Dashboard: React.FC = () => {
    const [form, setForm] = useState<any>({});
    const [respuesta, setRespuesta] = useState<AnalisisRespuesta | null>(null);
    const [cargando, setCargando] = useState(false);
    const [dark, setDark] = useState(false);
    const [view, setView] = useState<'dashboard' | 'config'>('dashboard');

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
        <div className={dark ? 'dark' : ''}>
            <div className="min-h-screen bg-[#fafafa] dark:bg-slate-950 font-sans pb-20 transition-colors duration-300">
                <Toaster position="top-right" />
                <nav className="bg-white dark:bg-slate-900 border-b dark:border-slate-800 sticky top-0 z-50 px-6 py-4 transition-colors duration-300">
                    <div className="max-w-6xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('dashboard')}>
                                <Activity className="text-rose-600" />
                                <span className="font-extrabold text-xl tracking-tight dark:text-white">
                                    Anemia<span className="text-rose-600">IA</span>
                                </span>
                            </div>
                            
                            <div className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                                <button 
                                    onClick={() => setView('dashboard')}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${view === 'dashboard' ? 'bg-white dark:bg-slate-700 shadow-sm text-rose-600 dark:text-rose-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                                >
                                    <LayoutDashboard className="size-3.5" /> Dashboard
                                </button>
                                <button 
                                    onClick={() => setView('config')}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${view === 'config' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                                >
                                    <Settings className="size-3.5" /> Config
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                             <button
                                onClick={() => setDark(d => !d)}
                                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors duration-200"
                                aria-label="Toggle dark mode"
                            >
                                {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
                            </button>
                        </div>
                    </div>
                </nav>

                <main className="max-w-6xl mx-auto px-6 py-10">
                    {view === 'dashboard' ? (
                        <div className="grid lg:grid-cols-[400px,1fr] gap-8">
                            <div className="space-y-6">
                                <UploadForm onUpload={handleSubmit} setForm={setForm} form={form} cargando={cargando} onCancel={handleCancelar} />
                                <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900 p-4 rounded-xl flex gap-3">
                                    <AlertCircle className="size-5 text-rose-500 shrink-0" />
                                    <p className="text-[10px] text-rose-700 dark:text-rose-400 leading-normal">
                                        Uso referencial. Los resultados deben ser validados por un profesional médico.
                                    </p>
                                </div>
                            </div>

                            <div id="res" className="space-y-6">
                                {!respuesta && !cargando ? (
                                    <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-600">
                                         <BrainCircuit className="size-10 mb-2 opacity-20" />
                                         <p className="text-sm font-medium">Esperando procesamiento de imagen...</p>
                                    </div>
                                ) : (
                                    <div className="animate-in fade-in duration-500 space-y-6">
                                        {respuesta?.error ? (
                                            <div className="p-4 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-xl border border-rose-100 dark:border-rose-900 text-sm font-medium">{respuesta.error}</div>
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
                        </div>
                    ) : (
                        <ConfigPage />
                    )}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
