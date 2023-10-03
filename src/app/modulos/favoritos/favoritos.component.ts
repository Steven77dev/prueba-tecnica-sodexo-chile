import { Component, OnInit } from '@angular/core';
import { NoticiaFavorita } from 'src/app/models/noticias-favoritas';
import { NoticiasExternasService } from 'src/app/services/noticias-externas.service';  
@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  title = 'Notificas favoritas';
  listado: NoticiaFavorita[] = [];
  paginaActual = 1;
  tamanioPagina = 12;
  totalNoticias!: number;
  totalPaginas: number[] = [];
  buscarNoticia = '';
  ordernarPor = 'desc';
  cargando: boolean = true;
  constructor(private noticiasService: NoticiasExternasService) { }

  ngOnInit(): void {

    this.filtrar();
  }

  buscar() {
    this.resetearPagina();

    this.filtrar();
  }

  filtrar(): void {
    this.contarNoticiasFavoritas(this.buscarNoticia);
    this.cargando = true;
    const offset = (this.paginaActual - 1) * this.tamanioPagina;
    this.noticiasService
      .listarFavoritas(offset, this.buscarNoticia, this.ordernarPor)
      .subscribe({
        next: (respuesta: any) => {
          this.listado = respuesta.data;

        },
        error: (error: any) => {
          console.error(error);
          this.cargando = false;
        }, complete: () => {

          this.cargando = false;
        }
      });
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.filtrar();

  }

  resetearPagina() {
    this.paginaActual = 1;
  }

  contarNoticiasFavoritas(titulo: string) {
    this.noticiasService.contarFavoritas(titulo).subscribe(
      (numero: number) => {
        this.totalNoticias = numero;
      },
      (error) => {
        console.error('Ocurrió un error al contar las favoritas:', error);
      });
  }

  quitarFavoritos(codigo: number) {
    this.cargando = true;
    this.noticiasService.eliminarFavorita(codigo).subscribe({
      next: (respuesta: any) => {
        const { data, mensaje, valido } = respuesta;
        if (valido == true) {
          console.log('La noticia fue removida de favoritas');
          this.buscar();
        } else {
          console.error('La noticia no pudo ser removida');
        }
        this.cargando = false;
      },
      error: (error: any) => {
        console.error(error); 
        this.cargando = false;
      }
    });
  }
}
