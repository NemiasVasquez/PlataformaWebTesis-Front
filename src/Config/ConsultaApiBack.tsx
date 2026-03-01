import toast from 'react-hot-toast';
import axios, { AxiosRequestConfig, AxiosError, Method } from 'axios';

export const BASE_URL = 'http://127.0.0.1:8000';

export async function consultaApiBack<T = any>(
    url: string,
    metodo: Method = 'POST',
    datos: Record<string, any> | FormData = {},
    mostrarToast: boolean = false
): Promise<T | null> {
    const metodoHttp = metodo.toLowerCase() as Method;
    const endpoint = `${BASE_URL}${url}`;

    const config: AxiosRequestConfig = {
        method: metodoHttp,
        url: endpoint,
        headers: {},
    };

    if (datos instanceof FormData) {
        config.data = datos;
    } else if (metodoHttp !== 'get') {
        config.data = datos;
        config.headers!['Content-Type'] = 'application/json';
    } else {
        config.params = datos;
    }

    let toastId: string | undefined;

    try {
        if (mostrarToast) {
            toastId = toast.loading('Enviando solicitud...');
        }

        const response = await axios<T>(config);

        if (mostrarToast && toastId) {
            toast.success('✅ Completado', { id: toastId });
        }

        return response.data;
    } catch (error: unknown) {
        console.log("Error: ", error)
        const err = error as AxiosError<any>;
        const mensaje =
            err.response?.data?.alert ||
            err.response?.data?.error ||
            (err.request
                ? 'No se recibió respuesta del servidor'
                : `Error en la solicitud: ${(err as Error).message}`);

        if (mostrarToast) {
            if (toastId) toast.error(mensaje, { id: toastId });
            else toast.error(mensaje);
        }
        //enviar error

        throw new Error(mensaje);
    }
}
