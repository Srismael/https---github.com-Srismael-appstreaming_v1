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

  actualizarUsuario(peliculaId: number, pelicula: Pelicula): Observable<any> {
    return this.http.put(`${this.apiUrl}/peliculas/${peliculaId}`, pelicula);
  }

  eliminarUsuario(peliculaId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/peliculas/${peliculaId}`);
  }
}

