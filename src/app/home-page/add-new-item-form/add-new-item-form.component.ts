import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-add-new-item-form',
    templateUrl: './add-new-item-form.component.html',
    styleUrls: ['../../app.component.css', './add-new-item-form.component.css']
})
export class AddNewItemFormComponent implements OnInit {

    @Input() isInputBig = false;
    @Output() addItem = new EventEmitter<string>();

    inputValue = '';
    showEmptyInputError = false;

    constructor() {
    }

    ngOnInit() {
    }

    onAddItemClick() {
        if (this.inputValue.trim()) {
            this.showEmptyInputError = false;
            this.addItem.emit(this.inputValue);
            this.inputValue = '';
        } else {
            this.showEmptyInputError = true;
        }
    }
}
