export interface Serie {
    _id: string;
    titulo: string;
    genero: string;
    anio: number;
    calificacion: number;
    fecha_estreno: Date;
    reparto: string[];
    sinopsis: string;
    disponibilidad: boolean;
    portada: string; // Suponiendo que 'portada' es una URL de la imagen
    temporadas: number;
}
