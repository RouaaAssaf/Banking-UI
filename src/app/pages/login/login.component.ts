import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  template: `
    <div class="flex justify-center items-center h-screen bg-gray-50">
      <mat-card class="w-96 p-6 text-center shadow-xl">
        <h2 class="text-2xl font-semibold mb-6">Admin Login</h2>

        <mat-form-field appearance="outline" class="w-full mb-4">
          <mat-label>Username</mat-label>
          <input matInput [(ngModel)]="username" />
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-full mb-4">
          <mat-label>Password</mat-label>
          <input matInput [(ngModel)]="password" type="password" />
        </mat-form-field>

        <button mat-raised-button color="primary" class="w-full" (click)="login()">Login</button>
      </mat-card>
    </div>
  `,
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private router: Router) {}
  ngOnInit() {
    //  Auto-redirect if already logged in
    if (localStorage.getItem('loggedIn') === 'true') {
      this.router.navigate(['/']);
    }
  }

  login() {
    // Simple demo logic — accept any username & password
    if (this.username.trim() && this.password.trim()) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('adminName', this.username);
      this.router.navigate(['/']); // Go to dashboard
    } else {
      alert('Please enter both username and password.');
    }
  }
}
