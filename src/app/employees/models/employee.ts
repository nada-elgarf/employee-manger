export interface Employee {
  id: number;
  fullName: string;
  department: string;
  position: string;
  email: string;
  phone: string;
  hireDate: Date;
  salary: number;
  status: 'Active' | 'Suspended' | 'Inactive';
}


