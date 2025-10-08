import { Component, Input } from '@angular/core';
import { SharedModule } from '../../../../app/shared/shared.module';


@Component({
  selector: 'app-customer-summary',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './customer-summary.component.html'
})
export class CustomerSummaryComponent {
  @Input() accounts: any[] = [];
}
