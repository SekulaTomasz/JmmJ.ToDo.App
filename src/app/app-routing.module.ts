import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './main/todo.component';
import { TaskFormComponent } from './main/newTask/task-form.component';
import { EditDialogComponent } from './main/editTaskDialog/edit-dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

const routes: Routes = [
  {path: '', component: TodoComponent },
  {path: 'create', component: TaskFormComponent},
  {path: 'edit', component: EditDialogComponent},
  {path: 'delete', component: ConfirmationDialogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
