import {Component, OnInit} from '@angular/core';
import {TodolistService} from '../shared/services/todolist.service';

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
    isTodolistsLoaded = false;

    constructor(private todolistService: TodolistService) {
    }

    ngOnInit() {
        this.isTodolistsLoaded = false;
        this.todolistService.getTodolists()
            .subscribe((res) => {
                this.todolists = res;
                this.isTodolistsLoaded = true;
            });
    }

    addTodolist(value: string) {
        this.isTodolistsLoaded = false;
        this.todolistService.addTodolist(value)
            .subscribe((res) => {
                this.todolists.unshift(res.data.item);
                this.isTodolistsLoaded = true;
            });
    }

    deleteTodolist(todolistId: string) {
        this.isTodolistsLoaded = false;
        this.todolistService.deleteTodolist(todolistId)
            .subscribe((res) => {
                this.todolists = this.todolists.filter((tl) => {
                    return tl.id !== todolistId;
                });
                this.isTodolistsLoaded = true;
            });
    }
}
