import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SharedModule } from '../../../../app/shared/shared.module';


@Component({
  selector: 'app-transaction-search',
  standalone: true,
  imports: [SharedModule],
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
