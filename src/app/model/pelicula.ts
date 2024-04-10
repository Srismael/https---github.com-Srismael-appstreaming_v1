export interface Pelicula {
    _id: number;
    Titulo: string;
    Genero: string[];
    anio: number;
    CalificacionRT: number;
    Comentarios: Comment[];
    estrellas_usuario: UserRating[];
    portada: string;
  }
  
  export interface Comment {
    usuario: string;
    contenido: string;
    fecha: Date;
  }
  
  export interface UserRating {
    usuario: string;
    Calificacion: number;
  }
