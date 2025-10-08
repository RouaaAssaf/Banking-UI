// src/app/core/services/customer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Customer } from '../../models/customer.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = environment.apiUrlCustomers; 

  constructor(private http: HttpClient) {}

  createCustomer(customer: { firstName: string; lastName: string; email: string }): Observable<{ id: string }> {
   return this.http.post<{ id: string }>(this.apiUrl, customer).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = 'An unexpected error occurred.';
        if (error.error?.message) {
          // ✅ Read 'message' from backend JSON
          errorMsg = error.error.message;
        } else if (error.status === 0) {
          errorMsg = 'Cannot connect to server.';
        }
        return throwError(() => new Error(errorMsg));
    })
    );
  }
  findCustomerByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/by-email/${email}`);
  }

 getAll(): Observable<Customer[]> {
  return this.http.get<any[]>(this.apiUrl).pipe(
    map(res =>
      res.map(c => ({
        customerId: c.CustomerId,
        firstName: c.FirstName,
        lastName: c.LastName,
        email: c.Email
      }))
    )
  );
}

}
