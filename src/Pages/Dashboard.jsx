import React, { useState, useRef } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { RenderInput } from '../Elements/RenderInput.tsx';
import { consultaApiBack } from '../Config/ConsultaApiBack.tsx';
import { Button } from '../Components/button.tsx';
import { BASE_URL } from '../Config/ConsultaApiBack.tsx';
const Dashboard = () => {
    const [form, setForm] = useState({});
    const [respuesta, setRespuesta] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [errorBandera, setErrorBandera] = useState(false);
    const formRef = useRef(null); // <-- Referencia al formulario

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form?.img) {
            toast.error('Por favor, selecciona una imagen');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('imagen', form.img);
            setCargando(true);
            const resultado = await consultaApiBack('/modelo/evaluar_imagen_anemia/', 'POST', formData, true);
            setErrorBandera(false);
            console.log("Resultado de la API:", resultado);
            setRespuesta(resultado);
        } catch (error) {
            setErrorBandera(true);
            setRespuesta(error.message);
        } finally {
            setCargando(false);
        }
    };

    const handleCancelar = () => {
        setForm({});
        setRespuesta("");
        setErrorBandera(false);
        if (formRef.current) formRef.current.reset(); // <-- Resetea el formulario
    };
    return (
        <div className="min-h-screen bg-gray-300 flex flex-col items-center justify-start p-4 space-y-10">
            <Toaster position="top-right" />
            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
                <div className="space-y-6 md:border-r md:pr-8">
                    <h1 className="text-2xl font-bold text-gray-800 text-center md:text-left">Evaluación de Anemia</h1>

                    <form onSubmit={handleSubmit} ref={formRef} className="space-y-5 text-center">
                        <RenderInput widthFile={"200px"} type="file" accept={'.jpg,.png,.jpeg'} name="img" label="Selecciona una imagen" setForm={setForm} />

                        <div className="flex justify-center gap-4">
                            <Button type="button" onClick={handleCancelar} variant={"cancelar"} disabled={cargando}>
                                Cancelar
                            </Button>
                            <Button type="submit" variant={'success'} disabled={cargando}>
                                {cargando ? 'Evaluando...' : 'Enviar Imagen'}
                            </Button>
                        </div>
                    </form>
                </div>

                <div className="space-y-4 md:pl-8">
                    <h2 className="text-xl font-semibold text-gray-700 text-center md:text-left">Resultado del análisis</h2>

                    {respuesta ? (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-auto">
                            <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                                {JSON.stringify(respuesta, null, 2)}
                            </pre>
                        </div>
                    ) : (
                        <p className="text-gray-500 italic text-center md:text-left">
                            No se ha enviado ninguna imagen aún.
                        </p>
                    )}
                </div>
            </div>

            {
                respuesta && !errorBandera && (
                    <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-6 md:p-10">
                        <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">Preprocesamiento</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
                            {[
                                {
                                    title: "Imagen Original",
                                    path: "entrada",
                                    desc: "Captura original sin filtros",
                                    ext: "jpeg",
                                },
                                {
                                    title: "Segmentación",
                                    path: "segmentada",
                                    desc: "Detección del área relevante",
                                    ext: "jpeg",
                                },
                                {
                                    title: "Recorte",
                                    path: "recortada",
                                    desc: "Área de interés delimitada",
                                    ext: "jpeg",
                                },
                                {
                                    title: "Conversión PNG",
                                    path: "png",
                                    desc: "Formato limpio y sin compresión",
                                    ext: "png",
                                },
                                {
                                    title: "Redimensionado",
                                    path: "resize",
                                    desc: "Tamaño estandarizado para IA",
                                    ext: "png",
                                },
                            ].map(({ title, path, desc, ext }) => (
                                <div key={path} className="flex flex-col items-center text-center space-y-2">
                                    <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                        <img
                                            src={`${BASE_URL}/${respuesta.directorio_procesado}/${path}/SIN ANEMIA/imagen.${ext}`}
                                            alt={title}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
                                        <p className="text-xs text-gray-600">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        </div >
    );
}

export default Dashboard;
