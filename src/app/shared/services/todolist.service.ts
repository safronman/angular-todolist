import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ITodo} from '../../home/home.component';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {delay} from 'rxjs/operators';

interface IAddTodoResponse {
    data: {
        item: ITodo
    };
    messages: Array<string>;
    resultCode: number;
}

export interface IResponse {
    data: {};
    messages: Array<string>;
    resultCode: number;
}

@Injectable({
    providedIn: 'root'
})
export class TodolistService {

    options = {
        withCredentials: true,
        headers: new HttpHeaders().append('API-KEY', environment.apiKey)
    };

    constructor(private http: HttpClient) {
    }

    getTodolists(): Observable<ITodo[]> {
        return this.http.get<ITodo[]>(`${environment.baseUrl}/todo-lists`, this.options)
            .pipe(
                // study delay for watch loading
                delay(1000)
            );
    }

    addTodolist(value: string): Observable<IAddTodoResponse> {
        return this.http.post<IAddTodoResponse>(`${environment.baseUrl}/todo-lists`, {title: value}, this.options);
    }

    deleteTodolist(todolistId: string): Observable<IResponse> {
        return this.http.delete<IResponse>(`${environment.baseUrl}/todo-lists/${todolistId}`, this.options);
    }

    updateTodolistTitle(todolistTitle: string, todolistId: string): Observable<IResponse> {
        return this.http.put<IResponse>(`${environment.baseUrl}/todo-lists/${todolistId}`,  {title: todolistTitle}, this.options);
    }
}


