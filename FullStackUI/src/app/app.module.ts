import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "../material-module";
import { HttpClientModule } from "@angular/common/http";
import { MatTableExporterModule } from 'mat-table-exporter';
import { FormsModule } from '@angular/forms';
import { EmployeeModalComponent } from './components/employee-modal/employee-modal.component';
import { DatePipe } from '@angular/common';
import { ModalComponentComponent } from './components/modal-component/modal-component.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeeComponent,
    EmployeeModalComponent,
    ModalComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    MatTableExporterModule,
    FormsModule,
    DragDropModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
