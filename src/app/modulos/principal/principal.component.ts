import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoticiaExterna } from 'src/app/models/noticias-externas';
import { NoticiasExternasService } from 'src/app/services/noticias-externas.service'; 

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  title = 'Portal de noticias';
  listado: NoticiaExterna[] = [];
  paginaActual = 1;
  tamanioPagina = 12;
  totalNoticias!: number;
  totalPaginas: number[] = [];
  buscarNoticia = '';
  ordernarPor = 'publishedAt';
  cargando: boolean = true;
  constructor(private noticiasService: NoticiasExternasService, private router: Router) { }

  ngOnInit(): void {
    this.buscar();
  }

  buscar(): void {
    this.cargando = true;
    const offset = (this.paginaActual - 1) * this.tamanioPagina;
    this.noticiasService
      .listarNoticias(offset, this.buscarNoticia, this.ordernarPor)
      .subscribe({
        next: (respuesta: any) => {
          const { count, next, prev, results } = respuesta;
          if (results != null) {
            this.totalNoticias = count;
            this.listado = results;
            
          }
        },
        error: (error: any) => {
          console.error(error);
          this.cargando = false;
        },
        complete:()=> {
          this.cargando = false;
        },
      });
  }

  cambiarPagina(pagina: number): void {
    this.cargando = true;
    this.paginaActual = pagina;
    this.buscar();

  }

  agregarAFavoritos(noticia: NoticiaExterna) {
    this.cargando = true;
    this.noticiasService.guardarFavorita(noticia).subscribe({
      next: (respuesta: any) => {
        const { data, mensaje, valido } = respuesta;
        if (valido == true) {
          console.log("Noticia guardada a favoritos"); 
        } else {
          console.error("No se pudo guardar en Favoritos");  
        }
        this.cargando = false;
      },
      error: (error: any) => {
        console.error(error);
        this.cargando = false;
      }
    });
  }

  irAFavoritos() {
    this.router.navigate(['/favoritas']);
  }

}
