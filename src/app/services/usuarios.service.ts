import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = 'http://localhost:5000'; // Ajusta la URL base según tu configuración

  constructor(private http: HttpClient) { }

  // Obtener todos los usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`);
  }

  // Obtener un usuario por su id
  getUsuario(usuarioId: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  // Agregar un nuevo usuario
  agregarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuario`, usuario);
  }

  // Actualizar un usuario existente
  actualizarUsuario(usuarioId: string, usuario: Usuario): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuario/${usuarioId}`, usuario);
  }

  // Eliminar un usuario por su id
  eliminarUsuario(usuarioId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  login(correo: string, contrasenia: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { correo, contrasenia });
  }

  cambiarContrasenia(correo: string, contraseniaActual: string, nuevaContrasenia: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cambiar_contrasenia`, { correo, contrasenia_actual: contraseniaActual, nueva_contrasenia: nuevaContrasenia });
  }
}
