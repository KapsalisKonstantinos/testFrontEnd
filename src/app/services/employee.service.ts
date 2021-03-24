import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../employee/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  target = '/employees'
  requestOptions = {
    headers: new HttpHeaders(),
    params: new HttpParams()
  };

  constructor(private http: HttpClient) { }

  init(){
    this.target = '/employees';
    this.requestOptions.headers = this.requestOptions.headers.delete('Content-type');
    this.requestOptions.headers = this.requestOptions.headers.append('Content-type', 'application/json');
    this.requestOptions.params = new HttpParams();
  }

  /**
   * Get a list with the names of the employees
   */
  getList(): Observable<string[]> {
    this.init();
    this.target = this.target.concat('/filter')
    this.requestOptions.params = this.requestOptions.params.append('listView', 'true');
    return this.http.get<any>(this.target, this.requestOptions);
  }

  /**
   * Get All Employees
   */
  get(): Observable<Employee[]> {
    this.init()
    return this.http.get<any>(this.target, this.requestOptions);
  }


  /**
   * Get the average salary
   */
  getAvg(): Observable<number> {
    this.init()
    return this.http.get<number>(this.target.concat('/avg'), this.requestOptions);
  }

  /**
   * Create new Employee
   * @param body Employee,
   */
  post(body: Employee): Observable<Employee> {
    this.init();
    this.target = this.target.concat('/employee')
    return this.http.post<Employee>(this.target, body, this.requestOptions);
  }

  /**
   * Update Employee
   * @param body Employee,
   */
  put(body: Employee, id: number): Observable<Employee> {
    this.init();
    this.target = this.target.concat('/employee/').concat(id.toString())
    return this.http.put<Employee>(this.target, body, this.requestOptions);
  }

  /**
   * Delete Employee
   * @param id Integer
   */
  delete(id: number): Observable<any> {
    this.init();
    this.target = this.target.concat('/employee/').concat(id.toString())
    return this.http.delete<any>(this.target, this.requestOptions);
  }
}
