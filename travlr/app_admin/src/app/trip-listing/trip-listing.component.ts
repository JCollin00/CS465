import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { trips } from '../data/trip';

@Component({
    selector: 'app-trip-listing',
    standalone: true,
    imports: [CommonModule, TripCardComponent],
    templateUrl: './trip-listing.component.html',
    styleUrl: './trip-listing.component.css'
})
export class TripListingComponent implements OnInit {
    trips: any[] = trips;

    constructor(private router: Router) { }

    ngOnInit(): void { }

    public addTrip(): void {
        this.router.navigate(['add-trip']);
    }
}