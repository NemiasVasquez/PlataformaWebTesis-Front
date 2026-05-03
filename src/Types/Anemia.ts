export interface AnalisisRespuesta {
    directorio_procesado: string;
    probable_clase: string;
    categoria: string;
    prediccion: number;
    confianza?: number;
    mensaje?: string;
    error?: string;
    rcap?: number;
}

export interface Step {
    title: string;
    path: string;
    desc: string;
    ext: "jpeg" | "png";
    filename?: string;
}
