import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { MatInputModule, MatRadioModule, MatButtonModule, 
  MatTableModule, MatIconModule, MatPaginatorModule, MatSortModule, MatExpansionModule,
   MatSelectModule, MatDialogModule } from '@angular/material';

import { DatePipe } from '@angular/common';
import { VacinaComponent } from './vacina/vacina/vacina.component';
import { VacinaListComponent } from './vacina/vacina-list/vacina-list/vacina-list.component';

@NgModule({
  declarations: [
    AppComponent,
    VacinaComponent,
    VacinaListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,

    MatInputModule,
    MatRadioModule,
    MatButtonModule, 
    MatTableModule,
    MatIconModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatDialogModule,

  ],
  providers: [HttpClient, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
