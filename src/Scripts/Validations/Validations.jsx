import { Toaster, toast } from 'react-hot-toast';

export function validarVacios(palabra, mensaje = 'El campo no puede estar vacío') {
    if (!palabra || palabra.trim() === '') {
        toast.error(mensaje);
        return false;
    }
    return true;
}

export function validarMaxCaracteres(palabra, mensaje = 'Supera el máximo de caracteres permitido', max = 255) {
    if (!validarVacios(palabra)) return false;
    if (palabra.length > max) {
        toast.error(mensaje);
        return false;
    }
    return true;
}

export function validarMinCaracteres(palabra, mensaje = 'No alcanza el mínimo de caracteres requeridos', min = 1) {
    if (!validarVacios(palabra)) return false;
    if (palabra.length < min) {
        toast.error(mensaje);
        return false;
    }
    return true;
}

export function validarSoloLetras(palabra, mensaje = 'Solo se permiten letras') {
    if (!validarVacios(palabra)) return false;
    const regex = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!regex.test(palabra)) {
        toast.error(mensaje);
        return false;
    }
    return true;
}

export function validarSoloNumeros(palabra, mensaje = 'Solo se permiten números') {
    if (!validarVacios(palabra)) return false;
    const regex = /^[0-9]+$/;
    if (!regex.test(palabra)) {
        toast.error(mensaje);
        return false;
    }
    return true;
}

export function validarLetrasNumeros(palabra, mensaje = 'Debe contener letras y números', minLetras = 1, minNumeros = 1) {
    if (!validarVacios(palabra)) return false;

    const letras = palabra.match(/[a-zA-Z]/g) || [];
    const numeros = palabra.match(/[0-9]/g) || [];

    if (letras.length < minLetras || numeros.length < minNumeros) {
        toast.error(`${mensaje}. Mínimo letras: ${minLetras}, números: ${minNumeros}`);
        return false;
    }

    return true;
}

export function validarCantidadCaracteres(palabra, mensaje = 'Cantidad inválida de caracteres', min = 1, max = 255) {
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


export function validarFormatoUrl(url, mensaje = 'URL NO VÁLIDA') {
     try {
        new URL(url); // lanza error si no es válida
    } catch {
        toast.error(mensaje);
        return false;
    }
    return true
}