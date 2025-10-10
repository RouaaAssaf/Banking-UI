// src/app/core/services/customer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private apiUrl = environment.apiUrlCustomers;

  constructor(private http: HttpClient) {}

  createCustomer(customer: { firstName: string; lastName: string; email: string }) {
    return this.http.post<{ id: string }>(this.apiUrl, customer)
      .pipe(catchError(this.handleError('Failed to create customer')));
  }

  findCustomerByEmail(email: string) {
    return this.http.get<any>(`${this.apiUrl}/by-email/${email}`)
      .pipe(catchError(this.handleError('Failed to find customer by email')));
  }

  getAll() {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        map(res => res.map(c => ({
          customerId: c.CustomerId,
          firstName: c.FirstName,
          lastName: c.LastName,
          email: c.Email
        }))),
        catchError(this.handleError('Failed to fetch customers'))
      );
  }

  // --- Helpers ---
  private handleError(msg: string) {
    return (error: any) => {
      const message = error?.error?.message || msg;
      console.error(message, error);
      return throwError(() => new Error(message));
    };
  }


delete(accountId: string) {
  return this.http.delete(`https://localhost:44394/api/accounts/${accountId}`);
}


}
