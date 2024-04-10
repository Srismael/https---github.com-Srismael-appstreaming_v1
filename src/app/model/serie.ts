export interface Serie {
    _id: number;
    titulo: string;
    genero: string;
    anio: number;
    rottenTomatoes: number;
    fecha_estreno: Date;
    reparto: string[];
    sinposis: string;
    disponible_en_netflix: boolean;
    portada: string; // Suponiendo que 'portada' es una URL de la imagen
    temporadas: number;
}
