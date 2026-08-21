import { Routes } from '@angular/router';
import { TripListingComponent } from './components/trip-listing/trip-listing.component';
import { AddTripComponent } from './components/add-trip/add-trip.component';
//import { EditTripComponent } from './components/edit-trip/edit-trip.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: '/trips', pathMatch: 'full' },
    { path: 'trips', component: TripListingComponent },
    { path: 'add-trip', component: AddTripComponent },
    //{ path: 'edit-trip', component: EditTripComponent },
    { path: 'login', component: LoginComponent }
];