import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../models/employee';
import { EmployeeFormData } from '../models/employeeFormData';


@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit  {

  @Input() employee: Employee | null = null;
  @Output() formSubmit = new EventEmitter<EmployeeFormData>();
  @Output() formCancel = new EventEmitter<void>();

  employeeForm!: FormGroup;
  editMode = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.editMode = !!this.employee;
    this.initializeForm();
  }

  private initializeForm(): void {
    this.employeeForm = this.fb.group({
      fullName: [
        this.employee?.fullName || '',
        [Validators.required, Validators.minLength(3)]
      ],
      department: [
        this.employee?.department || '',
        [Validators.required]
      ],
      hireDate: [
        this.employee?.hireDate || '',
        [Validators.required]
      ],
      status: [
        this.employee?.status || 'Active',
        [Validators.required]
      ]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const formData: EmployeeFormData = this.employeeForm.value;
      this.formSubmit.emit(formData);
    }
  }

  onCancel(): void {
    this.formCancel.emit();
  }

}
