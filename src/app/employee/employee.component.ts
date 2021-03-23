import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { concat, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CompanyService } from '../services/company.service';
import { EmployeeService } from '../services/employee.service';
import { Company } from './company/company';
import { Employee } from './Employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  company: Company = {};
  edit = false;
  editEmployeeId: number;

  employeeForm = this.formBuilder.group({
    name: new FormControl(),
    surname: new FormControl(),
    email: new FormControl(),
    address: new FormControl(),
    salary: new FormControl(),
    company_id: new FormControl()
  });

  dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>();
  displayedColumns: string[] = ['id', 'name', 'surname', 'email', 'address', 'salary', 'actions'];

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService,
              private companyService: CompanyService) { }

  ngOnInit(): void {
    const loadData = new Array<Observable<Employee[]>>();
    let obs: Observable<any>;

    obs = this.companyService.get()
      .pipe(map(data => {
        console.log(data);
        this.company.name = data[0].name;
        this.company.id = data[0].id;
      }, (error: any) => {
        console.log(error);
      }));
    loadData.push(obs);

    obs = this.employeeService.get()
      .pipe(map(data => {
        console.log(data);
        this.dataSource.data = data;
      }, (error: any) => {
        console.log(error);
      }));
    loadData.push(obs);
    concat(...loadData).subscribe();
  }

  submit() {
    let employee: Employee = {
      name: this.employeeForm.get('name').value,
      surname: this.employeeForm.get('surname').value,
      email: this.employeeForm.get('email').value,
      address: this.employeeForm.get('address').value,
      salary: this.employeeForm.get('salary').value,
      company_id: this.company.id
    }

    if(this.edit) {
      this.update(employee);
    } else {
      this.create(employee);
    }

    this.employeeForm.reset();
  }

  /**
   * Init the form with the selected employee's data
   * @param employee Employee,
   */
  editEmployee(employee: Employee) {
    this.edit = true;
    this.editEmployeeId = employee.id;
    this.employeeForm.get('name').setValue(employee.name);
    this.employeeForm.get('surname').setValue(employee.surname);
    this.employeeForm.get('email').setValue(employee.email);
    this.employeeForm.get('address').setValue(employee.address);
    this.employeeForm.get('salary').setValue(employee.salary);
  }

  /**
   * Delete Employee
   * @param employee Employee,
   */
  deleteEmployee(employee: Employee) {
    this.employeeService.delete(employee.id).subscribe();
  }

  /**
   * POST new Employee
   * @param employee Employee,
   */
  create(employee: Employee) {
    this.employeeService.post(employee).subscribe();
  }

  /**
   * PUT old Employee
   * @param employee Employee,
   */
  update(employee: Employee) {
    this.employeeService.put(employee, this.editEmployeeId).subscribe();
  }

}
