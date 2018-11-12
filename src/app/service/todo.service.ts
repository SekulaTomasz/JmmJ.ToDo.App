import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../model/task';
import { SortType } from '../enum/SortType';
import { Status } from '../enum/Status';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  url = 'https://todo-apiv1.azurewebsites.net';

  constructor(private http: HttpClient) { }

  getTasks(start: number, count: number, sortField: string, sortType: SortType): Promise<any> {
    return this.http.get<any>(this.url +
       `/api/Task/tasks?start=${start}&count=${count}&sortField=${sortField}&sortType=${sortType}`).toPromise();
  }

  getTasksByTitle(title: string, start: number, count: number, sortField: string, sortType: SortType): Promise<any> {
    return this.http.get<any>(this.url +
       `/api/Task/tasks/title/${title}}?start=${start}&count=${count}&sortField=${sortField}&sortType=${sortType}`).toPromise();
  }

  getTasksByDescription(description: string, start: number, count: number, sortField: string, sortType: SortType ): Promise<any> {
    return this.http.get<any>(this.url +
      `/api/Task/tasks/description/${description}}?start=${start}&count=${count}&sortField=${sortField}&sortType=${sortType}`).toPromise();
  }

  getTasksByFilter(filter: string, start: number, count: number, sortField: string, sortType: SortType ): Promise<any> {
    return this.http.get<any>(this.url +
       `/api/Task/tasks/filter/${filter}?start=${start}&count=${count}&sortField=${sortField}&sortType=${sortType}`).toPromise();
  }
  getTaskByStatus(status: Status, start: number, count: number, sortField: string, sortType: SortType ): Promise<any> {
    return this.http.get<any>(this.url +
       `/api/Task/tasks/status/${status}?start=${start}&count=${count}&sortField=${sortField}&sortType=${sortType}`).toPromise();
  }

  createNewTask(task: Task): Promise<any> {
    return this.http.post<any>(this.url + `/api/Task`, task, httpOptions).toPromise();
  }

  updateTask(task: Task): Promise<any> {
    return this.http.put<any>(this.url + `/api/Task`, task, httpOptions).toPromise();
  }

  deleteTask(id: string): Promise<any> {
    return this.http.delete<any>(this.url + `/api/Task?id=${id}`).toPromise();
  }
}
