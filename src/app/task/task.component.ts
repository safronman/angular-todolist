import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ITask} from '../todolist/todolist.component';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

    @Input() task: ITask;
    @Output() deleteTask = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit() {
    }

    onDeleteTaskClick(taskId: string) {
        this.deleteTask.emit(taskId);
    }
}
