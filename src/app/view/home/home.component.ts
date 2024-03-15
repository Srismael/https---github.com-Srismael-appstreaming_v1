import { Component, OnInit } from '@angular/core';
import { SeriesService } from 'src/app/services/series.service';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Pelicula } from 'src/app/model/pelicula';
import { Serie } from 'src/app/model/serie';
import { NavComponent } from '../complemets/nav/nav.component';
import { FooterComponent } from '../complemets/footer/footer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  peliculas?: Pelicula[];
  series?: Serie[];

  constructor(private peliculasService: PeliculasService, private seriesService: SeriesService) { }

  ngOnInit(): void {
    this.obtenerPeliculas();
    this.obtenerSeries();
  }

  obtenerPeliculas() {
    this.peliculasService.obtenerPeliculas().subscribe(peliculas => {
      this.peliculas = peliculas;
    });
  }

  obtenerSeries() {
    this.seriesService.obtenerSeries().subscribe(series => {
      this.series = series;
    });
  }

}
