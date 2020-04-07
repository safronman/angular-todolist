import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {ResultCode} from '../shared/enums/enums';

export interface IUser {
    email: string;
    password: string;
    rememberMe?: boolean;
    captcha?: boolean;
}

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

    formMessage = '';

    loginForm = new FormGroup({
        email: new FormControl('',
            [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,8}$')]),
        password: new FormControl('',
            [Validators.required, Validators.minLength(2)]),
    });

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {
    }

    ngOnInit() {
    }

    onSubmit() {
        const user: IUser = {
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        };

        this.authService.logIn(user)
            .subscribe(
                (res) => {
                    if (res.resultCode === ResultCode.Success) {
                        this.formMessage = '';
                        this.loginForm.reset();
                        this.router.navigate(['/']);
                    } else if (res.resultCode === ResultCode.Error) {
                        this.formMessage = res.messages[0];
                    }
                },
                (err) => {
                    console.log('Incorrect value');
                }
            );
    }
}
