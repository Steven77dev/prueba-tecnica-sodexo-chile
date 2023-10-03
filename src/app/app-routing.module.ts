import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { AppComponent } from './app.component';
import { PrincipalComponent } from './modulos/principal/principal.component';

const routes: Routes = [
  { path: 'principal', component: PrincipalComponent }, 
  { path: 'favoritas', loadChildren: () => import('./modulos/favoritos/favoritos.module').then(m => m.FavoritosModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
