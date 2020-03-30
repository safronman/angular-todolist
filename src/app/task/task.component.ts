import {Component, Input, OnInit} from '@angular/core';
import {ITask} from '../todolist/todolist.component';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

    @Input() task: ITask;

    constructor() {
    }

    ngOnInit() {
    }

}
