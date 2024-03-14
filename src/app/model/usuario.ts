export interface Usuario {
    _id?: string; // Id generado automáticamente por MongoDB, opcional en la inserción
    nombre_usuario: string;
    correo: string;
    contrasenia: string;
    pelicula_vistas: string[]; // Array de strings para almacenar identificadores de películas
    foto: string;
    listas: Lista[]; // Array de objetos Lista
  }
  
  export interface Lista {
    nombre: string;
    peliculas: string[]; // Array de strings para almacenar identificadores de películas
  }