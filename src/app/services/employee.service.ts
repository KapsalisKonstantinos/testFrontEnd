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

  getList(): Observable<string[]> {
    this.init();
    this.requestOptions.params = this.requestOptions.params.append('listView', 'true');
    return this.http.get<any>(this.target, this.requestOptions);
  }

  get(): Observable<Employee[]> {
    this.init()
    return this.http.get<any>(this.target, this.requestOptions);
  }

  getAvg(): Observable<number> {
    this.init()
    return this.http.get<number>(this.target.concat('/avg'), this.requestOptions);
  }

  post(body: any): Observable<Employee> {
    this.init();
    this.target = this.target.concat('/employee')
    return this.http.post<Employee>(this.target, body, this.requestOptions);
  }

  put(body: any, id: number): Observable<Employee> {
    this.init();
    this.target = this.target.concat('/employee/').concat(id.toString())
    return this.http.put<Employee>(this.target, body, this.requestOptions);
  }

  delete(id: number): Observable<any> {
    this.init();
    this.target = this.target.concat('/employee/').concat(id.toString())
    return this.http.delete<any>(this.target, this.requestOptions);
  }
}
