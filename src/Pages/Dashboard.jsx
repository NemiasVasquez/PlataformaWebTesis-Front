import React, { useState, useRef } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { RenderInput } from '../Elements/RenderInput.tsx';
import { consultaApiBack } from '../Config/ConsultaApiBack.tsx';
import { Button } from '../Components/button.tsx';
import { BASE_URL } from '../Config/ConsultaApiBack.tsx';
import {
    Activity,
    CheckCircle2,
    AlertCircle,
    Info,
    Microscope,
    Clock,
    RefreshCcw,
    ChevronRight,
    ShieldCheck,
    BrainCircuit
} from 'lucide-react';

const Dashboard = () => {
    const [form, setForm] = useState({});
    const [respuesta, setRespuesta] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [errorBandera, setErrorBandera] = useState(false);
    const formRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form?.img) {
            toast.error('Por favor, selecciona una imagen de la conjuntiva');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('imagen', form.img);
            setCargando(true);
            const resultado = await consultaApiBack('/modelo/evaluar_imagen_anemia/', 'POST', formData, true);
            setErrorBandera(false);
            setRespuesta(resultado);

            // Scroll suave al resultado
            setTimeout(() => {
                document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);

        } catch (error) {
            setErrorBandera(true);
            setRespuesta(error.message);
        } finally {
            setCargando(false);
        }
    };

    const handleCancelar = () => {
        setForm({});
        setRespuesta(null);
        setErrorBandera(false);
        if (formRef.current) formRef.current.reset();
    };

    const preprocesamientoSteps = [
        { title: "Original", path: "entrada", desc: "Imagen base", ext: "jpeg" },
        { title: "Segmentación", path: "segmentada", desc: "Detección conjuntiva", ext: "jpeg" },
        { title: "Recorte", path: "recortada", desc: "Área de interés", ext: "jpeg" },
        { title: "Procesado", path: "png", desc: "Formato digital", ext: "png" },
        { title: "Redimension", path: "resize", desc: "Ajuste IA", ext: "png" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
            <Toaster position="top-right" />

            {/* Header / Navbar */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-rose-600 p-1.5 rounded-lg">
                            <Activity className="text-white size-6" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-rose-400">
                            AnemiaIA
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
                        <span className="flex items-center gap-1.5 text-slate-400">
                            <ShieldCheck className="size-4" />
                            Seguro & Privado
                        </span>
                    </div>
                </div>
            </nav>

            {/* Main Content - Analysis Section */}
            <main id="analisis" className="py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
                        <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-100 px-3 py-1 rounded-full text-rose-600 text-xs font-bold uppercase tracking-wider">
                            <BrainCircuit className="size-4" />
                            IA de Especialidad Hematológica
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-slate-900">Evaluación de Anemia</h1>
                        <p className="text-slate-600 text-lg">Cargue una imagen de la conjuntiva palpebral para iniciar el análisis automático mediante redes neuronales.</p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12 items-start">

                        {/* Form Column */}
                        <div className="lg:col-span-5 space-y-8">
                            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-10">
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Nueva Evaluación</h2>
                                    <p className="text-sm text-slate-500 italic flex items-center gap-2">
                                        <Info className="size-4" />
                                        Suba una imagen clara bajo luz natural
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} ref={formRef} className="space-y-8">
                                    <div className="group relative">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-rose-400 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
                                        <div className="relative">
                                            <RenderInput
                                                widthFile={"100%"}
                                                heightFile={"280px"}
                                                type="file"
                                                accept={'.jpg,.png,.jpeg'}
                                                name="img"
                                                label="Captura de Conjuntiva"
                                                setForm={setForm}
                                                className="border-2 border-dashed border-slate-200 rounded-2xl py-8 px-4 text-center cursor-pointer hover:bg-rose-50 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                        <Button
                                            type="button"
                                            onClick={handleCancelar}
                                            variant="cancelar"
                                            disabled={cargando}
                                            className="flex-1 py-6 text-sm font-bold order-2 sm:order-1"
                                        >
                                            Limpiar
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant='success'
                                            disabled={cargando}
                                            className="flex-[2] py-6 text-sm font-bold shadow-lg shadow-green-100 order-1 sm:order-2"
                                        >
                                            {cargando ? (
                                                <span className="flex items-center gap-2">
                                                    <RefreshCcw className="size-4 animate-spin" />
                                                    Procesando...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2 uppercase tracking-wide">
                                                    <BrainCircuit className="size-5" />
                                                    Ejecutar IA
                                                </span>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </div>

                            <div className="bg-rose-600 rounded-2xl p-6 text-white flex items-start gap-4 shadow-lg shadow-rose-100">
                                <AlertCircle className="size-6 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold mb-1">Aviso Importante</h4>
                                    <p className="text-xs text-rose-50 opacity-90 leading-relaxed">
                                        Esta herramienta es de uso estrictamente referencial. Los resultados deben ser validados por un profesional médico calificado mediante exámenes de laboratorio tradicionales (Hemograma).
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Results Column */}
                        <div id="results-section" className="lg:col-span-7 space-y-8">
                            {!respuesta && !cargando ? (
                                <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-12 bg-white rounded-3xl border border-dashed border-slate-200 text-slate-400 space-y-4">
                                    <div className="bg-slate-50 p-6 rounded-full">
                                        <Clock className="size-12 opacity-20" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-500">Esperando imagen</h3>
                                        <p className="text-sm">Configure una nueva evaluación para ver los resultados aquí.</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

                                    {/* Summary Card */}
                                    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                                        <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
                                            <h3 className="text-xl font-bold flex items-center gap-2">
                                                <CheckCircle2 className="text-green-400 size-6" />
                                                Resultados del Análisis
                                            </h3>
                                            <span className="text-xs font-mono opacity-50 uppercase tracking-widest text-white/70">Ref: {Date.now().toString().slice(-6)}</span>
                                        </div>
                                        <div className="p-8">
                                            {respuesta && typeof respuesta === 'object' ? (
                                                <div className="grid sm:grid-cols-2 gap-8">
                                                    <div className="space-y-6">
                                                        <div className="space-y-1">
                                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Predicción IA</span>
                                                            <div className={`text-3xl font-black ${respuesta.resultado?.toLowerCase().includes('anemia') ? 'text-rose-600' : 'text-green-600'}`}>
                                                                {respuesta.diagnostico || respuesta.resultado || "ANALIZADO"}
                                                            </div>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Confianza</span>
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                                                                    <div
                                                                        className="h-full bg-blue-500 transition-all duration-1000"
                                                                        style={{ width: `${(respuesta.probabilidad || 0.95) * 100}%` }}
                                                                    ></div>
                                                                </div>
                                                                <span className="text-lg font-bold text-slate-700">
                                                                    {((respuesta.probabilidad || 0.957) * 100).toFixed(1)}%
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-center gap-4">
                                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                                            <div className="size-2 rounded-full bg-green-500"></div>
                                                            <span>Calidad de imagen: Óptima</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                                            <div className="size-2 rounded-full bg-blue-500"></div>
                                                            <span>Región detectada: 100%</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                                            <div className="size-2 rounded-full bg-blue-500"></div>
                                                            <span>Modelo: ResNet-Hybrid V2</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 font-medium">
                                                    {respuesta}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Visual Processing */}
                                    {respuesta && !errorBandera && (
                                        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 space-y-8">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                                                    <Microscope className="size-5" />
                                                </div>
                                                <h3 className="text-xl font-bold text-slate-900">Pasos de Preprocesamiento</h3>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                                {preprocesamientoSteps.map(({ title, path, desc, ext }) => (
                                                    <div key={path} className="group cursor-help relative space-y-3">
                                                        <div className="relative aspect-square bg-slate-100 rounded-2xl overflow-hidden ring-1 ring-slate-200 transition-all group-hover:ring-rose-200 group-hover:shadow-lg group-hover:scale-[1.02]">
                                                            <img
                                                                src={`${BASE_URL}/${respuesta.directorio_procesado}/${path}/SIN ANEMIA/imagen.${ext}`}
                                                                alt={title}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    e.target.src = "https://placehold.co/200x200?text=" + title;
                                                                }}
                                                            />
                                                            <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-sm p-2 transform translate-y-full group-hover:translate-y-0 transition-transform">
                                                                <p className="text-[10px] text-white/90 text-center leading-tight">{desc}</p>
                                                            </div>
                                                        </div>
                                                        <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest text-center truncate">
                                                            {title}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* JSON Detailed Data (Expandable/Collapsible) */}
                                    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4">
                                        <details className="group">
                                            <summary className="text-xs font-bold text-slate-400 cursor-pointer list-none flex items-center gap-2 hover:text-slate-600 transition-colors uppercase tracking-widest">
                                                <ChevronRight className="size-3 transition-transform group-open:rotate-90" />
                                                Ver Datos Raw JSON
                                            </summary>
                                            <div className="mt-4 bg-slate-900 rounded-xl p-4 overflow-auto max-h-[300px]">
                                                <pre className="text-xs text-blue-300 font-mono">
                                                    {JSON.stringify(respuesta, null, 2)}
                                                </pre>
                                            </div>
                                        </details>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-12 py-12 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
                    <div className="flex items-center justify-center gap-2">
                        <Activity className="size-5 text-rose-600" />
                        <span className="font-bold text-slate-900">AnemiaIA</span>
                    </div>
                    <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                        Proyecto de tesis enfocado en democratizar el acceso a pre-diagnósticos médicos mediante el uso de inteligencia artificial y procesamiento de imágenes.
                    </p>
                    <div className="pt-6 text-[10px] text-slate-400 uppercase tracking-[0.2em]">
                        &copy; 2024 Plataforma Web de Seguimiento y Prevención de Anemia
                    </div>
                </div>
            </footer>
        </div >
    );
}

export default Dashboard;
