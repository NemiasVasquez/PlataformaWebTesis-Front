import { toast } from 'react-hot-toast';

export function validarVacios(palabra: string | null | undefined, mensaje = 'El campo no puede estar vacío'): boolean {
    if (!palabra || palabra.trim() === '') {
        toast.error(mensaje);
        return false;
    }
    return true;
}

export function validarMaxCaracteres(palabra: string, mensaje = 'Supera el máximo de caracteres permitido', max = 255): boolean {
    if (!validarVacios(palabra)) return false;
    if (palabra.length > max) {
        toast.error(mensaje);
        return false;
    }
    return true;
}

export function validarMinCaracteres(palabra: string, mensaje = 'No alcanza el mínimo de caracteres requeridos', min = 1): boolean {
    if (!validarVacios(palabra)) return false;
    if (palabra.length < min) {
        toast.error(mensaje);
        return false;
    }
    return true;
}

export function validarSoloLetras(palabra: string, mensaje = 'Solo se permiten letras'): boolean {
    if (!validarVacios(palabra)) return false;
    const regex = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!regex.test(palabra)) {
        toast.error(mensaje);
        return false;
    }
    return true;
}

export function validarSoloNumeros(palabra: string, mensaje = 'Solo se permiten números'): boolean {
    if (!validarVacios(palabra)) return false;
    const regex = /^[0-9]+$/;
    if (!regex.test(palabra)) {
        toast.error(mensaje);
        return false;
    }
    return true;
}

export function validarLetrasNumeros(palabra: string, mensaje = 'Debe contener letras y números', minLetras = 1, minNumeros = 1): boolean {
    if (!validarVacios(palabra)) return false;
    const letras = palabra.match(/[a-zA-Z]/g) || [];
    const numeros = palabra.match(/[0-9]/g) || [];
    if (letras.length < minLetras || numeros.length < minNumeros) {
        toast.error(`${mensaje}. Mínimo letras: ${minLetras}, números: ${minNumeros}`);
        return false;
    }
    return true;
}

export function validarCantidadCaracteres(palabra: string, mensaje = 'Cantidad inválida de caracteres', min = 1, max = 255): boolean {
    const longitud = palabra.length;
    if (longitud < min) {
        toast.error(`${mensaje}. Mínimo: ${min} caracteres`);
        return false;
    }
    if (longitud > max) {
        toast.error(`${mensaje}. Máximo: ${max} caracteres`);
        return false;
    }
    return true;
}

export function validarFormatoUrl(url: string, mensaje = 'URL NO VÁLIDA'): boolean {
     try {
        new URL(url);
    } catch {
        toast.error(mensaje);
        return false;
    }
    return true;
}
