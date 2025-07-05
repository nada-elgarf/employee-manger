import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged, startWith, combineLatest, map } from 'rxjs';
import { EmployeeCardComponent } from './employees/employee-card/employee-card.component';
import { EmployeeFormComponent } from './employees/employee-form/employee-form.component';
import { Employee } from './employees/models/employee';
import { EmployeeFormData } from './employees/models/employeeFormData';
import { EmployeeService } from './employees/employee.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    EmployeeCardComponent,
    EmployeeFormComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'employee-manager';

   employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  totalEmployees = 0;

  searchControl = new FormControl('');
  statusFilter = new FormControl('All');

  showForm = false;
  selectedEmployee: Employee | null = null;

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.setupFilters();
  }

  private setupFilters(): void {
    const searchTerm$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged()
    );

    const statusFilter$ = this.statusFilter.valueChanges.pipe(
      startWith('All')
    );

    combineLatest([
      this.employeeService.getEmployees(),
      searchTerm$,
      statusFilter$
    ]).pipe(
      map(([employees, searchTerm, statusFilter]) => {
        this.employees = employees;
        this.totalEmployees = employees.length;

        return employees.filter(employee => {
          const matchesSearch = !searchTerm ||
            employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.hireDate.toLocaleDateString().includes(searchTerm);

          const matchesStatus = statusFilter === 'All' || employee.status === statusFilter;

          return matchesSearch && matchesStatus;
        });
      })
    ).subscribe(filtered => {
      this.filteredEmployees = filtered;
    });
  }

  openAddDialog(): void {
    this.selectedEmployee = null;
    this.showForm = true;
  }

  openEditDialog(employee: Employee): void {
    this.selectedEmployee = employee;
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.selectedEmployee = null;
  }

onFormSubmit(formData: EmployeeFormData): void {
  if (this.selectedEmployee) {
    this.employeeService.updateEmployee(this.selectedEmployee.id, formData);
    this.showSnackBar('Employee updated successfully');
  } else {
    this.employeeService.addEmployee(formData);
    this.showSnackBar('Employee added successfully');
  }
  this.closeForm();
}

confirmDelete(employeeId: number): void {
  if (confirm('Are you sure you want to delete this employee?')) {
    this.employeeService.deleteEmployee(employeeId);
    this.showSnackBar('Employee deleted successfully');
  }
}

private showSnackBar(message: string): void {
  this.snackBar.open(message, 'Close', {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top'
  });
}
}
