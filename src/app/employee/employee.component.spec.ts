import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AppRoutingModule } from '../app-routing.module';
import { CompanyService } from '../services/company.service';
import { EmployeeService } from '../services/employee.service';
import { Employee } from './Employee';

import { EmployeeComponent } from './employee.component';

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;
  let employeeService: EmployeeService;
  let companyService: CompanyService;

  const employee: Employee = {
    id: 1,
    name : 'test',
    address: 'street 1',
    email: 'test@test.com',
    salary: 1000,
    company_id: 1
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeComponent ],
      providers: [
        FormBuilder,
        EmployeeService,
        CompanyService
      ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatIconModule,
        FormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    employeeService = TestBed.inject(EmployeeService);
    companyService = TestBed.inject(CompanyService);
    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call refresh', () => {
    spyOn(component, 'refresh');
    component.ngOnInit();
    expect(component.refresh).toHaveBeenCalled();
  });


  it('should get data on refresh', () => {
    spyOn(companyService, 'get').and.returnValue(of([{}]));
    spyOn(employeeService, 'get').and.returnValue(of([{}]));
    spyOn(employeeService, 'getList').and.returnValue(of(['test']));
    spyOn(employeeService, 'getAvg').and.returnValue(of(0.0));
    component.refresh();
  });

  it('submit should call create', () => {
    component.edit = false;
    spyOn(component, 'create');
    spyOn(component.employeeForm, 'reset');
    spyOn(component, 'refresh');
    component.submit();
    expect(component.create).toHaveBeenCalled();
    expect(component.employeeForm.reset).toHaveBeenCalled();
    expect(component.refresh).toHaveBeenCalled();
  });

  it('submit should call update', () => {
    component.edit = false;
    spyOn(component, 'create');
    spyOn(component.employeeForm, 'reset');
    spyOn(component, 'refresh');
    component.submit();
    expect(component.create).toHaveBeenCalled();
    expect(component.employeeForm.reset).toHaveBeenCalled();
    expect(component.refresh).toHaveBeenCalled();
  });

  it('should reset form on cancel', () => {
    spyOn(component.employeeForm, 'reset');
    component.cancel();
    expect(component.employeeForm.reset).toHaveBeenCalled();
    expect(component.edit).toEqual(false);
  });

  it('should switch to listView', () => {
    spyOn(employeeService, 'getList').and.returnValue(of([]));
    component.listView = false;
    component.changeView();
    expect(employeeService.getList).toHaveBeenCalled();
    expect(component.listView).toEqual(true);
  });

  it('should switch to detailView', () => {
    spyOn(employeeService, 'get').and.returnValue(of([]));
    component.listView = true;
    component.changeView();
    expect(employeeService.get).toHaveBeenCalled();
    expect(component.listView).toEqual(false);
  });

  it('should fill form with data on edit', () => {
    component.editEmployee(employee);
    expect(component.employeeForm.get('name').value).toEqual('test');
    expect(component.employeeForm.get('address').value).toEqual('street 1');
    expect(component.employeeForm.get('email').value).toEqual('test@test.com');
    expect(component.employeeForm.get('salary').value).toEqual(1000);
    expect(component.edit).toEqual(true);
  });

  it('should call delete and refresh on delete', () => {

    spyOn(employeeService, 'delete').and.returnValue(of());
    spyOn(component, 'refresh');
    component.deleteEmployee(employee);
    expect(employeeService.delete).toHaveBeenCalled();
    expect(component.refresh).toHaveBeenCalled();
  });

  it('should call post', () => {
    spyOn(employeeService, 'post').and.returnValue(of({}));
    component.create(employee);
    expect(employeeService.post).toHaveBeenCalled();
  });

  it('should call put', () => {
    spyOn(employeeService, 'put').and.returnValue(of({}));
    component.update(employee);
    expect(employeeService.put).toHaveBeenCalled();
  });


});
