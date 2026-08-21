import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { TripDataService } from '../../services/trip-data.service';  // ← CORRECTION
import { Trip } from '../../models/trip';  // ← CORRECTION
import { AuthenticationService } from '../../services/authentication.service';  // ← CORRECTION

@Component({
    selector: 'app-trip-listing',
    standalone: true,
    imports: [CommonModule, TripCardComponent],
    templateUrl: './trip-listing.component.html',
    styleUrls: ['./trip-listing.component.css']
})
export class TripListingComponent implements OnInit {
    trips: Trip[] = [];
    message: string = '';

    constructor(
        private router: Router,
        private tripDataService: TripDataService,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit(): void {
        this.getTrips();
    }

    public addTrip(): void {
        this.router.navigate(['/add-trip']);
    }

    public isLoggedIn(): boolean {
        return this.authenticationService.isLoggedIn();
    }

    private getTrips(): void {
        this.tripDataService.getTrips()
            .subscribe({
                next: (data: Trip[]) => {
                    this.trips = data;
                    if (data.length === 0) {
                        this.message = 'No trips available';
                    }
                },
                error: () => {
                    this.message = 'Error loading trips';
                }
            });
    }
}