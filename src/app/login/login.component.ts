import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }
  authenticatedUser = [
    { username: 'di-admin@neutrinotechsystems.com', password: 'Nts@1234' }
  ];

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  submit() {
    if (this.form.valid && this.form.value.username === 'di-admin@neutrinotechsystems.com' ||'admin@123.com' && this.form.value.password === 'Nts@1234' ||'12345') {
      console.log("Routing");
      // this.auth.IsLoggedIn(true);
      localStorage.setItem('token', 'UserIsAuthenticated');
      this.router.navigate(['./wrapper'])
    }
    else {
      alert("UserName & Password should be Wrong...!")
      // this.auth.IsLoggedIn();
    }
  }

  ngOnInit(): void {
  }

}
