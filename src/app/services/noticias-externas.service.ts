import { Injectable } from '@angular/core';
import { NoticiaExterna } from '../models/noticias-externas';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class NoticiasExternasService {
  private apiUrl = 'http://localhost:8080/api/noticias';

  constructor(private http: HttpClient) {}

  listarNoticias(
    page: number = 1, 
    searchQuery: string = '',
    sortBy: string = 'publishedAt'
  ): Observable<NoticiaExterna[]> {
    const params = new HttpParams()
      .set('offset', page.toString())
      .set('search', searchQuery)
      .set('ordering', sortBy);

    return this.http.get<NoticiaExterna[]>(this.apiUrl+'/externas', { params });
  }


  listarFavoritas(
    page: number = 1, 
    titulo: string = '',
    sortBy: string = 'desc'
  ): Observable<NoticiaExterna[]> {
    const params = new HttpParams()
      .set('offset', page.toString())
      .set('titulo', titulo)
      .set('ordering', sortBy);

    return this.http.get<NoticiaExterna[]>(this.apiUrl+'/favoritas', { params });
  }

  guardarFavorita(noticiaExterna:NoticiaExterna){
    return this.http.post(this.apiUrl+'/guardarFavorita', noticiaExterna);
  }

  eliminarFavorita(codigoNoticia:number){ 
    return this.http.delete(this.apiUrl+'/'+codigoNoticia);
  }

  contarFavoritas(titulo: string = ''): Observable<number> {
    const params = new HttpParams() 
    .set('titulo', titulo) ;
    return this.http.get<number>(`${this.apiUrl}/contarFavoritas`,{params})
      .pipe(
        map(response => response)  // Mapea la respuesta directamente a un número
      );
  }
}
