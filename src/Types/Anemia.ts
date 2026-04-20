export interface AnalisisRespuesta {
    directorio_procesado: string;
    probable_clase: string;
    categoria: string;
    prediccion: number;
    mensaje?: string;
    error?: string;
}

export interface Step {
    title: string;
    path: string;
    desc: string;
    ext: "jpeg" | "png";
}
