import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { consultaApiBack } from '../Config/ConsultaApiBack';
import { UploadForm } from '../Components/Dashboard/UploadForm';
import { ResultSummary } from '../Components/Dashboard/ResultSummary';
import { ProcessingSteps } from '../Components/Dashboard/ProcessingSteps';
import { SmoothGradSteps } from '../Components/Dashboard/SmoothGradSteps';
import { IndicadoresSection } from '../Components/Dashboard/IndicadoresSection';
import { ConfigPage } from './ConfigPage';
import { IndicadoresPage } from './IndicadoresPage';
import { BrainCircuit, AlertCircle } from 'lucide-react';
import { AnalisisRespuesta } from '../Types/Anemia';
import { MainLayout } from '../Components/Layout/MainLayout';
import { AnalysisSkeleton } from '../Components/Skeletons/AnalysisSkeleton';

const Dashboard: React.FC = () => {
    const [form, setForm] = useState<any>({});
    const [respuesta, setRespuesta] = useState<AnalisisRespuesta | null>(null);
    const [cargando, setCargando] = useState(false);

    // TEMA CAVERNÍCOLA: Recordar si cueva es oscura o brillante
    const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
    const [view, setView] = useState<'dashboard' | 'config' | 'indicadores'>(
        window.location.pathname === '/configuracion' ? 'config' : 
        window.location.pathname === '/indicadores' ? 'indicadores' : 'dashboard'
    );

    useEffect(() => {
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    }, [dark]);

    useEffect(() => {
        const handlePath = () => {
            const path = window.location.pathname;
            setView(path === '/configuracion' ? 'config' : path === '/indicadores' ? 'indicadores' : 'dashboard');
        };
        window.addEventListener('popstate', handlePath);
        return () => window.removeEventListener('popstate', handlePath);
    }, []);

    const changeView = (newView: 'dashboard' | 'config' | 'indicadores') => {
        const path = newView === 'config' ? '/configuracion' : newView === 'indicadores' ? '/indicadores' : '/';
        window.history.pushState({}, '', path);
        setView(newView);
    };

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

    return (
        <MainLayout dark={dark} setDark={setDark} currentView={view} onChangeView={changeView}>
            {view === 'dashboard' ? (
                <div className="grid lg:grid-cols-[400px,1fr] gap-8 animate-in fade-in duration-700">
                    <div className="space-y-6">
                        <UploadForm onUpload={handleSubmit} setForm={setForm} form={form} cargando={cargando} onCancel={() => { setForm({}); setRespuesta(null); }} />
                        <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900 p-4 rounded-xl flex gap-3">
                            <AlertCircle className="size-5 text-rose-500 shrink-0" />
                            <p className="text-[10px] text-rose-700 dark:text-rose-400 leading-normal font-bold uppercase tracking-tighter">
                                Uso referencial. Resultados deben ser validados por profesional médico.
                            </p>
                        </div>
                    </div>

                    <div id="res" className="space-y-6">
                        {cargando ? (
                            <AnalysisSkeleton />
                        ) : !respuesta ? (
                            <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600">
                                <BrainCircuit className="size-16 mb-4 opacity-10 rotate-90" />
                                <p className="text-sm font-black uppercase tracking-widest opacity-40">Esperando imagen...</p>
                            </div>
                        ) : (
                            <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-6">
                                {respuesta?.error ? (
                                    <div className="p-6 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-2xl border border-rose-100 dark:border-rose-900 text-xs font-black uppercase tracking-widest">{respuesta.error}</div>
                                ) : (
                                    <>
                                        <ResultSummary respuesta={respuesta} />
                                        <ProcessingSteps respuesta={respuesta} />
                                        <SmoothGradSteps respuesta={respuesta} />
                                        <IndicadoresSection respuesta={respuesta} />
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ) : view === 'config' ? (
                <ConfigPage />
            ) : (
                <IndicadoresPage />
            )}
        </MainLayout>
    );
};

export default Dashboard;
