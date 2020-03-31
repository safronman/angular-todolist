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
    @Output() changeTask = new EventEmitter<ITask>();

    taskTitleEditMode = false;

    constructor() {
    }

    ngOnInit() {
    }

    onDeleteTaskClick(taskId: string) {
        this.deleteTask.emit(taskId);
    }

    onChangeCompletedTask(e) {
        this.task.status = e.currentTarget.checked ? 2 : 0;
        this.changeTask.emit(this.task);
    }

    onChangeTaskTitle() {
        this.changeTask.emit(this.task);
        this.taskTitleEditMode = false;
    }

    showEditMode() {
        this.taskTitleEditMode = true;
    }
}
