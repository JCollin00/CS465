import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../../services/trip-data.service';  // ← Vérifier le chemin

@Component({
    selector: 'app-add-trip',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './add-trip.component.html',
    styleUrls: ['./add-trip.component.css']
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
        this.submitted = true;
        if (this.addForm.valid) {
            const formData = this.addForm.value;
            formData.perPerson = Number(formData.perPerson);

            this.tripService.addTrip(formData)
                .subscribe({
                    next: (data: any) => {
                        console.log('Trip added:', data);
                        this.router.navigate(['/trips']);
                    },
                    error: (error: any) => {
                        console.log('Error adding trip:', error);
                    }
                });
        }
    }

    get f() { return this.addForm.controls; }
}