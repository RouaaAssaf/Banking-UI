import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Customer } from '../../models/customer.model';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private apiUrl = environment.apiUrlCustomers;

  constructor(private http: HttpClient) {}

  createCustomer(customer: Pick<Customer, 'firstName' | 'lastName' | 'email'>): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(this.apiUrl, customer)
      .pipe(catchError(this.handleError('Failed to create customer')));
  }

  findCustomerByEmail(email: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/by-email/${email}`)
      .pipe(catchError(this.handleError('Failed to find customer by email')));
  }

  getAll(): Observable<Customer[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(res => res.map(c => ({
        customerId: c.CustomerId,
        firstName: c.FirstName,
        lastName: c.LastName,
        email: c.Email
      }))),
      catchError(this.handleError('Failed to fetch customers'))
    );
  }

  deleteCustomer(customerId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${customerId}`)
      .pipe(catchError(this.handleError('Failed to delete customer')));
  }

 

  private handleError(msg: string) {
    return (error: unknown) => {
      const err = error as { error?: { message?: string }; message?: string };
      const message = err?.error?.message || err?.message || msg;
      console.error('CustomerService Error:', message);
      return throwError(() => new Error(message));
    };
  }
}
