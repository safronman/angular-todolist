import {Component, OnDestroy, OnInit} from '@angular/core';
import {TodolistService} from '../shared/services/todolist.service';
import {Subscription} from 'rxjs';

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
export class HomeComponent implements OnInit, OnDestroy {

    todolists: Array<ITodo> = [];
    isTodolistsLoaded = false;
    isTodolists = false;

    getTodoSub: Subscription;
    addTodoSub: Subscription;
    delTodoSub: Subscription;

    constructor(private todolistService: TodolistService) {
    }

    ngOnInit() {
        this.isTodolistsLoaded = false;
        this.getTodoSub = this.todolistService.getTodolists()
            .subscribe((res) => {
                if (res.length === 0) {
                    this.isTodolists = false;
                    this.isTodolistsLoaded = true;
                } else {
                    this.isTodolists = true;
                    this.todolists = res;
                    this.isTodolistsLoaded = true;
                }
            });
    }

    addTodolist(value: string) {
        this.isTodolistsLoaded = false;
        this.addTodoSub = this.todolistService.addTodolist(value)
            .subscribe((res) => {
                this.isTodolists = true;
                this.todolists.unshift(res.data.item);
                this.isTodolistsLoaded = true;
            });
    }

    deleteTodolist(todolistId: string) {
        this.isTodolistsLoaded = false;
        this.delTodoSub = this.todolistService.deleteTodolist(todolistId)
            .subscribe((res) => {
                this.todolists = this.todolists.filter((tl) => {
                    return tl.id !== todolistId;
                });
                if (this.todolists.length === 0) {
                    this.isTodolists = false;
                }
                this.isTodolistsLoaded = true;
            });
    }

    ngOnDestroy() {
        this.getTodoSub.unsubscribe();
        this.addTodoSub.unsubscribe();
        this.delTodoSub.unsubscribe();
    }
}
