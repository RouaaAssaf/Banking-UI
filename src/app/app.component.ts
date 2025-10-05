import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // import this

@Component({
  selector: 'app-root',
  standalone: true,            // make it standalone if not part of a module
  imports: [RouterModule],      // <-- import RouterModule
  template: `<router-outlet></router-outlet>`,
  styles: [``]
})
export class AppComponent {
  title = 'banking-ui';
}
