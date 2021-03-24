import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../employee/company/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  target = '/companies'
  requestOptions = {
    headers: new HttpHeaders(),
  };

  constructor(private http: HttpClient) { }

  /**
   * Get All Companies
   * @returns Company[]
   */
  get(): Observable<Company[]> {
    this.requestOptions.headers = this.requestOptions.headers.delete('Content-type');
    this.requestOptions.headers = this.requestOptions.headers.append('Content-type', 'application/json');
    return this.http.get<any>(this.target, this.requestOptions);;
  }
}
