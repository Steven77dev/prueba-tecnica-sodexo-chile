import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { RouterModule } from '@angular/router'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { PrincipalComponent } from './modulos/principal/principal.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule, 
    
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
