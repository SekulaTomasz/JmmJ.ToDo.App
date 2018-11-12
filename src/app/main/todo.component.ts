import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { TodoService } from 'src/app/service/todo.service';
import { Task } from '../model/task';
import { Status } from '../enum/Status';
import { Priority } from '../enum/Priority';
import { SortType } from '../enum/SortType';
import { EditDialogComponent } from '../main/editTaskDialog/edit-dialog.component';
import { HttpClient } from '@angular/common/http';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material';
import { enumHelper } from '../helper/enumHelper';



@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {


  tasks: Task[] = [];
  Status = Status;
  Priority = Priority;
  selectedFilter = 'All';
  visible: boolean;
  currentPage = 1;
  pageSize = 10;
  rowCount: number;
  sortField: string;
  isLoadingResults = true;
  sortBy = SortType[SortType.asc];
  searchValue = '';

  displayedColumns: string[] = ['Title', 'Description', 'ExpectedEndDate', 'CreatedAt', 'Priority', 'Status', 'Actions'];

  exampleDatabase: TodoService | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private service: TodoService, private dialog: MatDialog, private http: HttpClient, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.exampleDatabase = new TodoService(this.http);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.currentPage = 1;
      this.searchValue = '';
      this.selectedFilter = 'All';
    });
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase.getTasks(this.currentPage, this.pageSize, this.sort.active, SortType[this.sort.direction]);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.rowCount = data.rowCount;
          return data.results;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => {
        this.tasks = data;
      });
  }

  getTask() {
    this.isLoadingResults = true;
    this.service.getTasks(this.currentPage, this.pageSize, this.sort.active, SortType[this.sort.direction]).then(result => {
      this.tasks = result.results;
      this.currentPage = result.currentPage;
      this.pageSize = result.pageSize;
      this.rowCount = result.rowCount;
      this.sortField = result.sortField;
      this.isLoadingResults = false;
    });
  }

  removeTask(task: Task) {
    this.searchValue = '';
    this.selectedFilter = 'All';
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteTask(task.id).then(data => {
          if (data.statusCode === 200) {
            this.getTask();
          }
        });
      }
    });
  }

  editTask(task: Task) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '500px',
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      this.searchValue = '';
      this.selectedFilter = 'All';
      if (result !== undefined) {
        result.id = task.id;
        this.service.updateTask(result).then(x => {
          if (x.statusCode === 200) {
            this.getTask();
            return;
          }
          // tslint:disable-next-line:forin
          for (const i in x.exception) {
            this.snackBar.open(x.exception[i], '', {
              duration: 3000,
            });
          }
        });
      }
    });
  }

  applyFilter(target: any) {
    this.selectedFilter = 'All';
    this.searchValue = target.value;
    this.isLoadingResults = true;
    if (target.value.length <= 0) {
      this.getTask();
      return;
    }
    this.service.getTasksByFilter(target.value, this.currentPage, this.pageSize, this.sort.active, SortType[this.sort.direction])
      .then(result => {
        this.tasks = result.results;
        this.currentPage = result.currentPage;
        this.pageSize = result.pageSize;
        this.rowCount = result.rowCount;
        this.sortField = result.sortField;
        this.isLoadingResults = false;
      });
  }

  onPaginateChange(event) {
    this.currentPage = event.pageIndex + 1;
  }
  onFilterChange(event) {
    let status;
    switch (event) {
      case 'NotNeded':
      status = Status.NotNeded;
      break;
      case 'Ended':
      status = Status.Ended;
      break;
      default:
      this.getTask();
        return;
    }
    this.isLoadingResults = true;
    this.service.getTaskByStatus(status, this.currentPage, this.pageSize, this.sort.active, SortType[this.sort.direction])
    .then(result => {
      this.tasks = result.results;
      this.currentPage = result.currentPage;
      this.pageSize = result.pageSize;
      this.rowCount = result.rowCount;
      this.sortField = result.sortField;
      this.isLoadingResults = false;
    });
  }
}
