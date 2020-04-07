import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {ResultCode} from '../enums/enums';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    isAuth = false;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        this.authService.me()
            .subscribe((res) => {
                switch (res.resultCode) {

                    case ResultCode.Success: {
                        this.isAuth = true;
                        this.router.navigate(['/']);
                        break;
                    }

                    case ResultCode.Error: {
                        this.isAuth = false;
                        this.router.navigate(['/login'], {
                            queryParams: {
                                auth: false
                            }
                        });
                        break;
                    }
                }
            });
        return this.isAuth;
    }
}
