import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/enum/Status';
import { Priority } from 'src/app/enum/Priority';
import { FormGroup, FormControl } from '@angular/forms';
import { TodoService } from 'src/app/service/todo.service';
import { Task } from 'src/app/model/task';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { enumHelper } from 'src/app/helper/enumHelper';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  Status = Status;
  Priority = Priority;
  priorityOptions = enumHelper(Priority);
  statusOptions = enumHelper(Status);
  statusValue: Status = Status.NotNeded;
  priorityValue: Priority = Priority.Medium;
  task: Task;

  taskForm = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    expectedEndDate: new FormControl(),
    status: new FormControl(),
    priority: new FormControl()
  });

  constructor(private service: TodoService, private snackBar: MatSnackBar,
     private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.task = this.taskForm.value;
      this.service.createNewTask(this.task).then(result => {
        if (result.statusCode === 201) {
          this.router.navigate(['../']);
        }
        // tslint:disable-next-line:forin
        for (let i in result.exception) {
          this.snackBar.open(result.exception[i], '', {
            duration: 2000,
          });
        }
      });
    }
  }
}
