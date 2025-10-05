// src/app/core/services/customer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'api/customers'; // adjust port

  constructor(private http: HttpClient) {}

  createCustomer(customer: { firstName: string; lastName: string; email: string }): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(this.apiUrl, customer);
  }
  findCustomerByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/by-email/${email}`);
  }

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }
}
