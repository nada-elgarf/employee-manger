export interface EmployeeFormData {
   fullName: string;
  department: string;
  position: string;
  email: string;
  phone: string;
  hireDate: Date;
  salary: number;
  status: 'Active' | 'Suspended' | 'Inactive';
}
