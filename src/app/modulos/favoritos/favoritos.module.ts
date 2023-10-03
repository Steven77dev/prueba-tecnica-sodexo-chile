import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritosRoutingModule } from './favoritos-routing.module';
import { FavoritosComponent } from './favoritos.component';
import { FormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { RouterModule } from '@angular/router'; 
@NgModule({
  declarations: [FavoritosComponent],
  exports:[FavoritosComponent],
  imports: [
    CommonModule,
    FavoritosRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule,

  ]
})
export class FavoritosModule { }