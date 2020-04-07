import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

    loginForm = new FormGroup({
        email: new FormControl('',
            [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,8}$')]),
        password: new FormControl('',
            [Validators.required, Validators.minLength(5)]),
    });

    constructor() {
    }

    ngOnInit() {
    }

    onSubmit() {
        debugger
        this.loginForm.get('email')
        // console.warn(this.loginForm.value);
    }
}
