import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ITodo} from '../../home/home.component';
import {Observable} from 'rxjs';

interface IAddTodoResponse {
    data: {
        item: ITodo
    };
    messages: Array<string>;
    resultCode: number;
}

interface IDeleteTodoResponse {
    data: {};
    messages: Array<string>;
    resultCode: number;
}


@Injectable({
    providedIn: 'root'
})
export class TodolistService {

    constructor(private http: HttpClient) {
    }

    getTodolists(): Observable<ITodo[]> {
        return this.http.get<ITodo[]>('https://social-network.samuraijs.com/api/1.0/todo-lists',
            {
                withCredentials: true,
                headers: new HttpHeaders().append('API-KEY', '794181ab-6d62-4cfb-bc9f-d539dfac55f1')
            });
    }

    addTodolist(value: string): Observable<IAddTodoResponse> {
        return this.http.post<IAddTodoResponse>('https://social-network.samuraijs.com/api/1.0/todo-lists',
            {title: value},
            {
                withCredentials: true,
                headers: new HttpHeaders().append('API-KEY', '794181ab-6d62-4cfb-bc9f-d539dfac55f1')
            });
    }

    deleteTodolist(todolistId: string): Observable<IDeleteTodoResponse> {
        return this.http.delete<IDeleteTodoResponse>(`https://social-network.samuraijs.com/api/1.0/todo-lists/${todolistId}`,
            {
                withCredentials: true,
                headers: new HttpHeaders().append('API-KEY', '794181ab-6d62-4cfb-bc9f-d539dfac55f1')
            });
    }

}


