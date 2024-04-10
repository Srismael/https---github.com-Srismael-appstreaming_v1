import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Serie } from '../model/serie';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  obtenerSeries(): Observable<Serie[]> {
    return this.http.get<Serie[]>(`${this.apiUrl}/series`);
  }

  obtenerUsuario(serieId: number): Observable<Serie> {
    return this.http.get<Serie>(`${this.apiUrl}/series/${serieId}`);
  }

  agregarUsuario(usuario: Serie): Observable<any> {
    return this.http.post(`${this.apiUrl}/series`, usuario);
  }

  actualizarUsuario(serieId: number, serie: Serie): Observable<any> {
    return this.http.put(`${this.apiUrl}/series/${serieId}`, serie);
  }

  eliminarUsuario(serieId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/serie/${serieId}`);
  }

  obtenerSeriePorTitulo(titulo: string): Observable<Serie> {
    return this.http.get<Serie>(`${this.apiUrl}/titulo/${encodeURIComponent(titulo)}`);
  }
}
