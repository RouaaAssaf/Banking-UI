import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../../app/shared/shared.module';

@Component({
  selector: 'app-transaction-search',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './transaction-search.component.html',
  styleUrls: ['./transaction-search.component.scss']
})
export class TransactionSearchComponent {
  form: FormGroup;

  @Output() accountClicked = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      accountId: ['', Validators.required]
    });
  }

  searchAccount() {
    const accountId = this.form.value.accountId;
    if (!accountId) return;

    this.accountClicked.emit(accountId);
  }
}
