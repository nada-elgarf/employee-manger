import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from './models/employee';
import { EmployeeFormData } from './models/employeeFormData';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  public employees$ = this.employeesSubject.asObservable();

  private mockEmployees: Employee[] = [
      {
      id: 1,
      fullName: 'John Smith',
      department: 'Engineering',
      position: 'Senior Software Engineer',
      email: 'john.smith@company.com',
      phone: '+1 (555) 123-4567',
      hireDate: new Date('2020-03-15'),
      salary: 95000,
      status: 'Active'
    },
    {
      id: 2,
      fullName: 'Sarah Johnson',
      department: 'Marketing',
      position: 'Marketing Manager',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 234-5678',
      hireDate: new Date('2019-07-22'),
      salary: 78000,
      status: 'Active'
    },
    {
      id: 3,
      fullName: 'Michael Brown',
      department: 'Finance',
      position: 'Financial Analyst',
      email: 'michael.brown@company.com',
      phone: '+1 (555) 345-6789',
      hireDate: new Date('2021-01-10'),
      salary: 65000,
      status: 'Suspended'
    },
    {
      id: 4,
      fullName: 'Emily Davis',
      department: 'Human Resources',
      position: 'HR Specialist',
      email: 'emily.davis@company.com',
      phone: '+1 (555) 456-7890',
      hireDate: new Date('2018-11-05'),
      salary: 58000,
      status: 'Active'
    },
    {
      id: 5,
      fullName: 'David Wilson',
      department: 'Engineering',
      position: 'DevOps Engineer',
      email: 'david.wilson@company.com',
      phone: '+1 (555) 567-8901',
      hireDate: new Date('2022-02-14'),
      salary: 88000,
      status: 'Inactive'
    },
    {
      id: 6,
      fullName: 'Lisa Anderson',
      department: 'Sales',
      position: 'Sales Representative',
      email: 'lisa.anderson@company.com',
      phone: '+1 (555) 678-9012',
      hireDate: new Date('2020-09-30'),
      salary: 52000,
      status: 'Active'
    }
  ];

  constructor() {
    this.employeesSubject.next(this.mockEmployees);
  }

  getEmployees(): Observable<Employee[]> {
    return this.employees$;
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.mockEmployees.find(emp => emp.id === id);
  }

  addEmployee(employeeData: EmployeeFormData): void {
    const newEmployee: Employee = {
      id: this.generateId(),
      ...employeeData
    };
    this.mockEmployees.push(newEmployee);
    this.employeesSubject.next([...this.mockEmployees]);
  }

  updateEmployee(id: number, employeeData: EmployeeFormData): void {
    const index = this.mockEmployees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.mockEmployees[index] = { id, ...employeeData };
      this.employeesSubject.next([...this.mockEmployees]);
    }
  }

  deleteEmployee(id: number): void {
    this.mockEmployees = this.mockEmployees.filter(emp => emp.id !== id);
    this.employeesSubject.next([...this.mockEmployees]);
  }

  private generateId(): number {
    return Math.max(...this.mockEmployees.map(emp => emp.id)) + 1;
  }
}
