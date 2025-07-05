export interface EmployeeFormData {
   fullName: string;
  department: string;
  position: string;
  hireDate: Date;
  status: 'Active' | 'Suspended' | 'Inactive';
}
