import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pelicula } from '../model/pelicula';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  obtenerPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(`${this.apiUrl}/peliculas`);
  }

  obtenerUsuario(peliculaId: number): Observable<Pelicula> {
    return this.http.get<Pelicula>(`${this.apiUrl}/peliculas/${peliculaId}`);
  }

  agregarUsuario(usuario: Pelicula): Observable<any> {
    return this.http.post(`${this.apiUrl}/peliculas`, usuario);
  }

  actualizarPelicula(peliculaId: number, pelicula: Pelicula): Observable<any> {
    return this.http.put(`${this.apiUrl}/pelicula/${peliculaId}`, pelicula);
  }

  eliminarPelicula(peliculaId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/pelicula/${peliculaId}`);
  }
  obtenerPeliculaPorTitulo(titulo: string): Observable<Pelicula> {
    // Modifica la URL de la solicitud para buscar por título en lugar de por ID
    return this.http.get<Pelicula>(`${this.apiUrl}/peliculas/titulo/${titulo}`);
  }
}

