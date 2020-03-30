import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
        return this.http.get<ITodo[]>(environment.baseUrl, environment.options)
            .pipe(
                // study delay for watch loading
                delay(1000)
            );
    }

    addTodolist(value: string): Observable<IAddTodoResponse> {
        return this.http.post<IAddTodoResponse>(environment.baseUrl, {title: value}, environment.options);
    }

    deleteTodolist(todolistId: string): Observable<IDeleteTodoResponse> {
        return this.http.delete<IDeleteTodoResponse>(`${environment.baseUrl}/${todolistId}`, environment.options);
    }

}


