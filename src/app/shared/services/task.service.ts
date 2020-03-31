import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {ITask} from '../../todolist/todolist.component';
import {IResponse} from './todolist.service';

interface ITaskResponse {
    items: Array<ITask>;
    totalCount: number;
    error: string;
}

interface IAddOrUpdateTaskResponse {
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

    addTask(todolistId: string, title: string): Observable<IAddOrUpdateTaskResponse> {
        return this.http.post<IAddOrUpdateTaskResponse>(`${environment.baseUrl}/todo-lists/${todolistId}/tasks`, {title}, this.options);
    }

    deleteTask(todolistId: string, taskId: string): Observable<IResponse> {
        return this.http.delete<IResponse>(`${environment.baseUrl}/todo-lists/${todolistId}/tasks/${taskId}`, this.options);
    }

    updateTask(todolistId: string, taskId: string, task: ITask): Observable<IAddOrUpdateTaskResponse> {
        return this.http.put<IAddOrUpdateTaskResponse>(`${environment.baseUrl}/todo-lists/${todolistId}/tasks/${taskId}`,
            task,
            this.options
        );
    }

}
