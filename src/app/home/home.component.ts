import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface ITodo {
    id: string;
    addedDate: string;
    order: number;
    title: string;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    todolists: Array<ITodo> = [];

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.http.get<ITodo[]>('https://social-network.samuraijs.com/api/1.0/todo-lists', {
            withCredentials: true
        }).subscribe((res) => {
            this.todolists = res;
        });

        this.todolists = [
            {
                id: '1',
                addedDate: new Date().toString(),
                order: 1,
                title: 'Todo name'
            },
            {
                id: '2',
                addedDate: new Date().toString(),
                order: 2,
                title: 'Todo name 2'
            },
            {
                id: '3',
                addedDate: new Date().toString(),
                order: 3,
                title: 'Todo name 3'
            }
        ];
    }

}
