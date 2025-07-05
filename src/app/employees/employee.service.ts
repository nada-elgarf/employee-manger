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
      hireDate: new Date('2020-03-15'),
      status: 'Active'
    },
    {
      id: 2,
      fullName: 'Sarah Johnson',
      department: 'Marketing',
      hireDate: new Date('2019-07-22'),
      status: 'Active'
    },
    {
      id: 3,
      fullName: 'Michael Brown',
      department: 'Finance',
      hireDate: new Date('2021-01-10'),
      status: 'Suspended'
    },
    {
      id: 4,
      fullName: 'Emily Davis',
      department: 'Human Resources',
      hireDate: new Date('2018-11-05'),
      status: 'Active'
    },
    {
      id: 5,
      fullName: 'David Wilson',
      department: 'Engineering',
      hireDate: new Date('2022-02-14'),
      status: 'Inactive'
    },
    {
      id: 6,
      fullName: 'Lisa Anderson',
      department: 'Sales',
      hireDate: new Date('2020-09-30'),
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
