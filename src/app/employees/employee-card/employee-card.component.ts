import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../models/employee';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';


@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.css'
})
export class EmployeeCardComponent {
  @Input() employee!: Employee;
  @Output() editEmployee = new EventEmitter<Employee>();
  @Output() deleteEmployee = new EventEmitter<number>();

  onEdit(): void {
    this.editEmployee.emit(this.employee);
  }

  onDelete(): void {
    this.deleteEmployee.emit(this.employee.id);
  }

  getStatusIcon(status: string): string {
    switch(status) {
      case 'Active': return 'check_circle';
      case 'Suspended': return 'pause_circle';
      case 'Inactive': return 'cancel';
      default: return 'help';
    }
  }
}
