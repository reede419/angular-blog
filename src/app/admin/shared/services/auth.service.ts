import { environment } from './../../../../environments/environment';
import { FireBaseAuthResponse, User } from './../../../shared/interfaces';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
// мы не пишем provideIn, потому что мы его зарегестрировали в
// admin.module.ts в providers

export class AuthService {

    public error$: Subject<string> = new Subject<string>() //error$ - стрим
    
    constructor(private http: HttpClient) {}

    get token(): string {
        const expDate =new Date( localStorage.getItem('fb-token-exp'))

        if(new Date() > expDate) {
            this.logout()
            return null
        }
        return localStorage.getItem('fb-token')
    }

    login(user: User): Observable<any> {
        user.returnSecureToken = true
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
            .pipe(
                tap(this.setToken),
                catchError(this.handleError.bind(this))

            )
            // login admin@gmail.com
            // pwd - 123456
    }

    logout() {
        this.setToken(null)
    }

    isAuthenticated(): boolean {
        return !!this.token
        // !! - приводит к булевому значению
    }

    private handleError(error: HttpErrorResponse) {
        const {message} = error.error.error
        switch(message) {
            case 'INVALID_PASSWORD':
                this.error$.next('Неверный пароль')
                break
            case 'INVALID_EMAIL':
                this.error$.next('Неверный email')
                break
            case 'EMAIL_NOT_FOUND':
                this.error$.next('Такого email нет')
                break
        }

        return throwError(error)
        // if( message ) {

        // }
    }

    private setToken(response: FireBaseAuthResponse | null) { // `|` - означает или
        // console.log(response, 'response Set Token')
        if(response) {
            const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000) //делаю числом
            localStorage.setItem('fb-token', response.idToken) //переменная 'fb-token' - firebase token
            localStorage.setItem('fb-token-exp', expDate.toString()) //переменная 'fb-token-exp' - firebase token expires
        } else {
            localStorage.clear()
        }
    }
}