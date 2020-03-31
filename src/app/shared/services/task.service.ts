import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {ITask} from '../../todolist/todolist.component';

interface ITaskResponse {
    items: Array<ITask>;
    totalCount: number;
    error: string;
}

interface IAddTaskResponse {
    data: {
        item: ITask
    };
    resultCode: number;
    messages: Array<string>;
}


@Injectable({providedIn: 'root'})
export class TaskService {

    options = {
        withCredentials: true,
        headers: new HttpHeaders().append('API-KEY', environment.apiKey)
    };

    constructor(private http: HttpClient) {
    }

    getTasks(todolistId: string): Observable<ITaskResponse> {
        return this.http.get<ITaskResponse>(`${environment.baseUrl}/todo-lists/${todolistId}/tasks`, this.options);
    }

    addTask(todolistId: string, title: string): Observable<IAddTaskResponse> {
        return this.http.post<IAddTaskResponse>(`${environment.baseUrl}/todo-lists/${todolistId}/tasks`, {title}, this.options);
    }
}
