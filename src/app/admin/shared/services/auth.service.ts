import { environment } from './../../../../environments/environment';
import { FireBaseAuthResponse, User } from './../../../shared/interfaces';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
// мы не пишем provideIn, потому что мы его зарегестрировали в
// admin.module.ts в providers

export class AuthService {

    constructor(private http: HttpClient) {}

    get token(): string {
        return ''
    }

    login(user: User): Observable<any> {
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
            .pipe(
                tap(this.setToken)
            )
            // login admin@gmail.com
            // pwd - 123456
    }

    logout() {
        
    }

    isAuthenticated(): boolean {
        return !!this.token
        // !! - приводит к булевому значению
    }

    private setToken(response: FireBaseAuthResponse) {
        console.log(response, 'response Set Token')
    }
}