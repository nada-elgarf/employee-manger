export interface Employee {
  id: number;
  fullName: string;
  department: string;
  hireDate: Date;
  status: 'Active' | 'Suspended' | 'Inactive';
}


