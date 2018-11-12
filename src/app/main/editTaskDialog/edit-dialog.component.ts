import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Task } from 'src/app/model/task';
import { Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Status } from 'src/app/enum/Status';
import { Priority } from 'src/app/enum/Priority';
import { enumHelper } from 'src/app/helper/enumHelper';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {

  Status = Status;
  Priority = Priority;
  priorityOptions = enumHelper(Priority);
  statusOptions = enumHelper(Status);

  taskForm = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    expectedEndDate: new FormControl(),
    status: new FormControl(),
    priority: new FormControl()
  });

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task) {
      this.taskForm.controls['title'].setValue(data.title);
      this.taskForm.controls['description'].setValue(data.description);
      this.taskForm.controls['expectedEndDate'].setValue(data.expectedEndDate);
      this.taskForm.controls['status'].setValue(data.status);
      this.taskForm.controls['priority'].setValue(data.priority);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
