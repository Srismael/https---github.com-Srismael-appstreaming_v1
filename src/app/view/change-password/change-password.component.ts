import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  correo: string = '';
  contraseniaActual: string = '';
  nuevaContrasenia: string = '';
  confirmarContrasenia: string = '';
  mensaje: string = '';

  constructor(private UsuariosService: UsuariosService) { }

  cambiarContrasenia() {
    if (this.nuevaContrasenia !== this.confirmarContrasenia) {
      this.mensaje = 'Las contraseñas no coinciden.';
      return;
    }

    this.UsuariosService.cambiarContrasenia(this.correo, this.contraseniaActual, this.nuevaContrasenia)
      .subscribe(
        response => {
          this.mensaje = response.mensaje;
          // Lógica adicional si es necesario
        },
        error => {
          console.error(error);
          this.mensaje = 'Error al cambiar la contraseña.';
        }
      );
  }

}
