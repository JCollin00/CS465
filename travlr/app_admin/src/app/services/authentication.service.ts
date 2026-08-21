import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private apiUrl = 'http://localhost:3000/api';

    constructor(
        @Inject(BROWSER_STORAGE) private storage: Storage,
        private http: HttpClient
    ) { }

    public saveToken(token: string): void {
        this.storage.setItem('travlr-token', token);
    }

    public getToken(): string | null {
        return this.storage.getItem('travlr-token');
    }

    public logout(): void {
        this.storage.removeItem('travlr-token');
    }

    public isLoggedIn(): boolean {
        const token = this.getToken();
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                return payload.exp > (Date.now() / 1000);
            } catch {
                return false;
            }
        }
        return false;
    }

    public getCurrentUser(): User | null {
        if (this.isLoggedIn()) {
            const token = this.getToken();
            if (token) {
                try {
                    const { email, name } = JSON.parse(atob(token.split('.')[1]));
                    return { email, name } as User;
                } catch {
                    return null;
                }
            }
        }
        return null;
    }

    public login(user: User, password: string): Promise<any> {
        return this.http.post(`${this.apiUrl}/login`, {
            email: user.email,
            password: password
        }).toPromise()
            .then((response: any) => {
                if (response && response.token) {
                    this.saveToken(response.token);
                }
                return response;
            });
    }

    public register(user: User, password: string): Promise<any> {
        return this.http.post(`${this.apiUrl}/register`, {
            name: user.name,
            email: user.email,
            password: password
        }).toPromise()
            .then((response: any) => {
                if (response && response.token) {
                    this.saveToken(response.token);
                }
                return response;
            });
    }
}