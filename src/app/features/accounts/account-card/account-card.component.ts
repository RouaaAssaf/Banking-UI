import { SharedModule } from '../../../../app/shared/shared.module';
import { Component, Input, Output, EventEmitter } from '@angular/core';




@Component({
  selector: 'app-account-card',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent {
  @Input() account: any;
  @Output() addTransaction = new EventEmitter<string>();

  onAddTransaction() {
    this.addTransaction.emit(this.account.accountId);
  }
}
