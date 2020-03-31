import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ITodo} from '../home/home.component';
import {TaskService} from '../shared/services/task.service';
import {Subscription} from 'rxjs';

export interface ITask {
    description: string;
    title: string;
    completed: boolean;
    status: number;
    priority: number;
    startDate: string;
    deadline: string;
    id: string;
    todoListId: string;
    order: number;
    addedDate: string;
}

export interface IChangeTodoTitle {
    todolistTitle: string;
    todolistId: string;
}

@Component({
    selector: 'app-todolist',
    templateUrl: './todolist.component.html',
    styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit, OnDestroy {

    @Input() todolist: ITodo;
    @Output() deleteTodo = new EventEmitter<string>();
    @Output() changeTodoTitle = new EventEmitter<IChangeTodoTitle>();

    tasks: Array<ITask> = [];
    editTitleMode = false;
    taskLoading = false;

    subscriptions: Subscription = new Subscription();

    constructor(private taskService: TaskService) {
    }

    ngOnInit() {
        this.taskLoading = true;
        this.subscriptions.add(this.taskService.getTasks(this.todolist.id)
            .subscribe((res) => {
                this.tasks = res.items;
                this.taskLoading = false;
            }));
    }

    onDeleteTodolistClick(todolistId) {
        this.deleteTodo.emit(todolistId);
    }

    changeTitle() {
        this.editTitleMode = true;
    }

    onBlurTodolistTitle(todolistId) {
        this.changeTodoTitle.emit({todolistTitle: this.todolist.title, todolistId});
        this.editTitleMode = false;
    }

    addTask(title) {
        this.taskLoading = true;
        this.subscriptions.add(this.taskService.addTask(this.todolist.id, title)
            .subscribe((res) => {
                this.tasks.unshift(res.data.item);
                this.taskLoading = false;
            }));
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
