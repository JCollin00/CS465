import { Routes } from '@angular/router';
import { TripListingComponent } from './trip-listing/trip-listing.component';

export const routes: Routes = [
    { path: '', component: TripListingComponent, pathMatch: 'full' }
];