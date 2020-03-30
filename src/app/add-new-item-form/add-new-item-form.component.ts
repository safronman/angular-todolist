import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-add-new-item-form',
    templateUrl: './add-new-item-form.component.html',
    styleUrls: ['../app.component.css',  './add-new-item-form.component.css']
})
export class AddNewItemFormComponent implements OnInit {

    @Input() isInputBig = false;

    constructor() {
    }

    ngOnInit() {
    }

}
