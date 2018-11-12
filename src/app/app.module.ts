import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoComponent } from './main/todo.component';
import { AngularMaterialModule, } from './module/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskFormComponent } from './main/newTask/task-form.component';
import { EditDialogComponent } from './main/editTaskDialog/edit-dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TaskFormComponent,
    EditDialogComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
