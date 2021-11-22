import { Injectable } from "@angular/core";
import { delay, of, tap } from "rxjs";

@Injectable()
export class AuthService {
    isLoggedIn: boolean = false;
    redirectUrl: string;

    login(name: string, password: string) {
        let isLoggedIn = (name === 'admin' && password === 'admin');

        return of(true).pipe(
            delay(1000),
            tap(() => this.isLoggedIn = isLoggedIn)
        );
    }

    logout() {
        this.isLoggedIn = false;
    }
}