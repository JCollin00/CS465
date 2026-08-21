import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../../models/trip';  // ← CORRECTION
import { AuthenticationService } from '../../services/authentication.service';  // ← CORRECTION

@Component({
    selector: 'app-trip-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './trip-card.component.html',
    styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {
    @Input('trip') trip: any;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit(): void { }

    public editTrip(): void {
        localStorage.setItem('tripCode', this.trip.code);
        this.router.navigate(['/edit-trip']);
    }

    public isLoggedIn(): boolean {
        return this.authenticationService.isLoggedIn();
    }
}