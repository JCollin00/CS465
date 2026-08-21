import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';

@Component({
    selector: 'app-add-trip',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],  // ← IMPORTANT
    templateUrl: './add-trip.component.html',
    styleUrl: './add-trip.component.css'
})
export class AddTripComponent implements OnInit {
    addForm!: FormGroup;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private tripService: TripDataService
    ) { }

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            code: ['', Validators.required],
            name: ['', Validators.required],
            length: ['', Validators.required],
            start: ['', Validators.required],
            resort: ['', Validators.required],
            perPerson: ['', [Validators.required, Validators.min(0)]],
            image: ['', Validators.required],
            description: ['', Validators.required]
        });
    }

    public onSubmit() {
        console.log('1. Submit button clicked!');  // ← AJOUTER
        this.submitted = true;
        console.log('2. Form valid?', this.addForm.valid);  // ← AJOUTER

        if (this.addForm.valid) {
            console.log('3. Form is valid, preparing data...');  // ← AJOUTER
            const formData = this.addForm.value;
            formData.perPerson = Number(formData.perPerson);
            console.log('4. Data to send:', formData);  // ← AJOUTER

            this.tripService.addTrip(formData)
                .subscribe({
                    next: (data: any) => {
                        console.log('5. Success!', data);  // ← AJOUTER
                        this.router.navigate(['']);
                    },
                    error: (error: any) => {
                        console.log('6. Error:', error);  // ← AJOUTER
                    }
                });
        } else {
            console.log('7. Form is INVALID!');  // ← AJOUTER
            console.log('8. Form errors:', this.addForm.errors);  // ← AJOUTER
        }
    }

    get f() { return this.addForm.controls; }
}
