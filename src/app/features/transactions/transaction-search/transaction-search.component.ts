import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-transaction-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  template: `
    <mat-card>
      <form [formGroup]="form" (ngSubmit)="searchAccount()">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Enter Account ID</mat-label>
          <input matInput placeholder="Account ID" formControlName="accountId" />
        </mat-form-field>

        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
          Search
        </button>
      </form>
    </mat-card>
  `,
  styles: [`.full-width { width: 100%; margin-bottom: 12px; }`]
})
export class TransactionSearchComponent {
  form: FormGroup;

  @Output() accountClicked = new EventEmitter<string>(); // emit accountId to parent

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      accountId: ['', Validators.required]
    });
  }

  searchAccount() {
    const accountId = this.form.value.accountId;
    if (!accountId) return;

    this.accountClicked.emit(accountId); // parent receives string directly
  }
}
