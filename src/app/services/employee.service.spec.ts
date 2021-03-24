import { getTestBed, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EmployeeService } from './employee.service';
import { Observable, of, Subject } from 'rxjs';
import { Employee } from '../employee/Employee';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpTestingController: HttpTestingController;

  const employee: Employee = {
    id: 1,
    name : 'test',
    address: 'street 1',
    email: 'test@test.com',
    salary: 1000,
    company_id: 1
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        EmployeeService
      ]
    });
    httpTestingController = getTestBed().get(HttpTestingController);
    service = getTestBed().inject(EmployeeService);
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET employees in detail', () => {
    const response: Observable<JSON> = of(JSON.parse('{}'));
    const JSONresponse = new Subject<JSON>();
    const json: JSON = JSON.parse('{}');

    const obs = service.get().subscribe();
    const mockReq = httpTestingController.expectOne('/employees');

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');

    mockReq.flush(JSONresponse);
    httpTestingController.verify();
    obs.unsubscribe();
  });

  it('should GET employees in simple list', () => {
    const response: Observable<JSON> = of(JSON.parse('{}'));
    const JSONresponse = new Subject<JSON>();
    const json: JSON = JSON.parse('{}');

    const obs = service.getList().subscribe();
    const mockReq = httpTestingController.expectOne('/employees/filter?listView=true');

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');

    mockReq.flush(JSONresponse);
    httpTestingController.verify();
    obs.unsubscribe();
  });

  it('should GET employees in simple list', () => {
    const response: Observable<JSON> = of(JSON.parse('{}'));
    const JSONresponse = new Subject<JSON>();
    const json: JSON = JSON.parse('{}');

    const obs = service.getAvg().subscribe();
    const mockReq = httpTestingController.expectOne('/employees/avg');

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');

    mockReq.flush(JSONresponse);
    httpTestingController.verify();
    obs.unsubscribe();
  });

  it('should send DELETE Request', () => {
    const response: Observable<JSON> = of(JSON.parse('{}'));
    const JSONresponse = new Subject<JSON>();
    const json: JSON = JSON.parse('{}');

    const obs = service.delete(1).subscribe();
    const mockReq = httpTestingController.expectOne('/employees/employee/1');

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');

    mockReq.flush(JSONresponse);
    httpTestingController.verify();
    obs.unsubscribe();
  });

  it('should send PUT Request Employee', () => {
    const response: Observable<JSON> = of(JSON.parse('{}'));
    const JSONresponse = new Subject<JSON>();
    const json: JSON = JSON.parse('{}');

    const obs = service.put(employee, 1).subscribe();
    const mockReq = httpTestingController.expectOne('/employees/employee/1');

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');

    mockReq.flush(JSONresponse);
    httpTestingController.verify();
    obs.unsubscribe();
  });

  it('should send POST Request Employee', () => {
    const response: Observable<JSON> = of(JSON.parse('{}'));
    const JSONresponse = new Subject<JSON>();
    const json: JSON = JSON.parse('{}');

    const obs = service.post(employee).subscribe();
    const mockReq = httpTestingController.expectOne('/employees/employee');

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');

    mockReq.flush(JSONresponse);
    httpTestingController.verify();
    obs.unsubscribe();
  });
});
