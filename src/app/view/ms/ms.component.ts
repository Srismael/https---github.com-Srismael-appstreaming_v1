import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Serie } from 'src/app/model/serie';
import { SeriesService } from 'src/app/services/series.service';

@Component({
  selector: 'app-ms',
  templateUrl: './ms.component.html',
  styleUrls: ['./ms.component.css']
})
export class MsComponent implements OnInit {
  serie: Serie | null = null;

  constructor(
    private route: ActivatedRoute,
    private seriesService: SeriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const titulo = params['titulo']; // No necesitas codificar el título aquí
      this.obtenerSeriePorTitulo(titulo);
    });
  }

  obtenerSeriePorTitulo(titulo: string): void {
    this.seriesService.obtenerSeriePorTitulo(titulo)
      .subscribe((serie: Serie) => this.serie = serie);
  }

  borrarSerie(): void {
    if (this.serie) {
      this.seriesService.eliminarUsuario(this.serie._id)
        .subscribe(() => {
          console.log("Serie eliminada exitosamente");
          // Otras acciones después de eliminar la serie, como redireccionar a otra página
          this.router.navigate(['/home']);
        });
    }
  }
}
