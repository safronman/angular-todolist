import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ITodo} from '../../home/home.component';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

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

    options = {
        withCredentials: true,
        headers: new HttpHeaders().append('API-KEY', '794181ab-6d62-4cfb-bc9f-d539dfac55f1')
    };

    constructor(private http: HttpClient) {
    }

    getTodolists(): Observable<ITodo[]> {
        return this.http.get<ITodo[]>(environment.baseUrl, this.options);
    }

    addTodolist(value: string): Observable<IAddTodoResponse> {
        return this.http.post<IAddTodoResponse>(environment.baseUrl, {title: value}, this.options);
    }

    deleteTodolist(todolistId: string): Observable<IDeleteTodoResponse> {
        return this.http.delete<IDeleteTodoResponse>(`${environment.baseUrl}/${todolistId}`, this.options);
    }

}


