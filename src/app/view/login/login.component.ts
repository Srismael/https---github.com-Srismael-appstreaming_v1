import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const correo = this.loginForm.value.correo;
    const contrasenia = this.loginForm.value.contrasenia;

    this.usuariosService.login(correo, contrasenia).subscribe(
      (response) => {
        // Login exitoso, redirigir a la página principal u otra página
        this.router.navigate(['/home']);
      },
      (error) => {
        this.errorMessage = 'Correo electrónico o contraseña incorrectos.';
      }
    );
  }
}
