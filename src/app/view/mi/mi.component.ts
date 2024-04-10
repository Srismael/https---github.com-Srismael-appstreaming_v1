import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pelicula, Comment } from 'src/app/model/pelicula';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-mi',
  templateUrl: './mi.component.html',
  styleUrls: ['./mi.component.css']
})
export class MiComponent implements OnInit {
  pelicula: Pelicula | null = null;
  nuevoComentario: Comment = { usuario: '', contenido: '', fecha: new Date() };

  constructor(
    private route: ActivatedRoute,
    private peliculasService: PeliculasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const titulo = encodeURIComponent(params['Titulo']); // Codificar el título
      this.obtenerPeliculaPorTitulo(titulo);
    });
  }

  obtenerPeliculaPorTitulo(titulo: string): void {
    this.peliculasService.obtenerPeliculaPorTitulo(titulo)
      .subscribe((pelicula: Pelicula) => {
        this.pelicula = pelicula;
        if (this.pelicula) {
          // Realiza cualquier acción adicional que necesites con la película
        }
      });
  }

  borrarPelicula(): void {
    if (this.pelicula) {
      this.peliculasService.eliminarPelicula(this.pelicula._id)
        .subscribe(() => {
          console.log("Película eliminada exitosamente");
          // Otras acciones después de eliminar la película, como redireccionar a otra página
          this.router.navigate(['/home']);
        });
    }
  }

  agregarComentario(): void {
    if (this.pelicula && this.nuevoComentario.usuario && this.nuevoComentario.contenido) {
      if (!this.pelicula.Comentarios) {
        this.pelicula.Comentarios = [];
      }
      this.pelicula.Comentarios.push(this.nuevoComentario);
      this.peliculasService.actualizarPelicula(this.pelicula._id, this.pelicula)
        .subscribe(() => {
          console.log("Comentario agregado exitosamente");
          // Limpia el formulario después de agregar el comentario
          this.nuevoComentario = { usuario: '', contenido: '', fecha: new Date() };
          // Vuelve a cargar la película si el título existe para mostrar el nuevo comentario agregado
          if (this.pelicula && this.pelicula.Titulo) {
            this.obtenerPeliculaPorTitulo(this.pelicula.Titulo);
          }
        });
    }
  }
}