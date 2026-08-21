import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';  // ← CORRECTION
import { User } from '../../models/user';  // ← CORRECTION

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    credentials = { email: '', password: '' };
    error: string = '';

    constructor(
        private router: Router,
        private authService: AuthenticationService
    ) { }

    onLoginSubmit() {
        const user = new User();
        user.email = this.credentials.email;
        user.name = this.credentials.email.split('@')[0];

        this.authService.login(user, this.credentials.password)
            .then(() => {
                this.router.navigate(['/trips']);
            })
            .catch(() => {
                this.error = 'Login failed. Please try again.';
            });
    }
}