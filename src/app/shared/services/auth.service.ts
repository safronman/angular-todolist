import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {IUser} from 'src/app/login-page/login-page.component';

interface ILoginResponse {
    resultCode: number;
    messages: Array<string>;
    data: {
        userId: number
    };
}

interface IAuthMeResponse {
    resultCode: number;
    messages: Array<string>;
    data: {
        id: number
        email: string
        login: string
    };
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    options = {
        withCredentials: true,
        headers: new HttpHeaders().append('API-KEY', environment.apiKey)
    };

    constructor(private http: HttpClient) {
    }

    logIn(user: IUser): Observable<ILoginResponse> {
        return this.http.post<ILoginResponse>(`${environment.baseUrl}/auth/login`, user, this.options);
    }

    logOut(): Observable<ILoginResponse> {
        return this.http.delete<ILoginResponse>(`${environment.baseUrl}/auth/login`, this.options);
    }

    me(): Observable<IAuthMeResponse> {
        return this.http.get<IAuthMeResponse>(`${environment.baseUrl}/auth/me`, this.options);
    }
}
