import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sigup',
  templateUrl: './sigup.component.html',
  styleUrls: ['./sigup.component.css']
})
export class SigupComponent {
  nuevoUsuario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router
  ) {
    this.nuevoUsuario = this.formBuilder.group({
      nombre_usuario: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
      foto: null,
      lista_nombre: [''],
      lista_peliculas: ['']
    });
  }

  onSubmit(): void {
    if (this.nuevoUsuario.valid) {
      const usuario: Usuario = {
        nombre_usuario: this.nuevoUsuario.value.nombre_usuario,
        correo: this.nuevoUsuario.value.correo,
        contrasenia: this.nuevoUsuario.value.contrasenia,
        pelicula_vistas: [],
        foto: this.nuevoUsuario.value.foto, // No se está recopilando este dato en el formulario actualmente
        listas: []
      };
  
      this.usuariosService.agregarUsuario(usuario).subscribe(
        () => {
          console.log('Usuario registrado exitosamente.');
          this.router.navigate(['']);
        },
        error => {
          console.error('Error al registrar usuario:', error);
        }
      );
    }
  }

}
