import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { cpuUsage } from 'process';
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
  listView = false;
  employeeList: string[];
  averageSalary: string;

  employeeForm = this.formBuilder.group({
    name: new FormControl(null, [Validators.required]),
    surname: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
    salary: new FormControl(null, [Validators.required]),
    company_id: new FormControl()
  });

  dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>();
  displayedColumns: string[] = ['id', 'name', 'surname', 'email', 'address', 'salary', 'actions'];

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService,
              private companyService: CompanyService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(){
    const loadData = new Array<Observable<Employee[]>>();
    let obs: Observable<any>;

    obs = this.companyService.get()
      .pipe(map(data => {
        this.company.name = data[0].name;
        this.company.id = data[0].id;
      }, (error: any) => {
        console.log(error);
      }));
    loadData.push(obs);

    obs = this.employeeService.get()
      .pipe(map(data => {
        this.dataSource.data = data;
      }, (error: any) => {
        console.log(error);
      }));
    loadData.push(obs);

    obs = this.employeeService.getList()
      .pipe(map(data => {
        this.employeeList = data;
      }, (error: any) => {
        console.log(error);
      }));
    loadData.push(obs);

    obs = this.employeeService.getAvg()
      .pipe(map(data => {
        if(data===0.0) {
          this.averageSalary = '-'
        } else {
          this.averageSalary = data.toLocaleString();
        }
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
    this.refresh();
  }

  cancel() {
    this.employeeForm.reset();
    this.edit = false;
  }

  changeView (){
    if(!this.listView) {
      this.employeeService.getList().subscribe( res => {
        this.employeeList = res;
        this.listView = !this.listView
      })
    } else {
      this.employeeService.get().subscribe( res => {
        this.listView = !this.listView
      })
    }
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
    this.refresh();
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
