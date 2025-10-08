import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  hidePassword = true;
  currentYear = new Date().getFullYear();

  constructor(private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('loggedIn') === 'true') {
      this.router.navigate(['/']);
    }
  }

  login() {
    if (this.username.trim() && this.password.trim()) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('adminName', this.username);
      this.router.navigate(['/']);
    } else {
      alert('Please enter both username and password.');
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
