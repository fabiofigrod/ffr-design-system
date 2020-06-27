import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Credentials } from '../models/credentials';

@Component({
  selector: 'ffr-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  message: string;
  isLoggingIn = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.message = this.activatedRoute.snapshot.paramMap.get('message');
  }

  login(credentials: Credentials): void {
    this.isLoggingIn = true;
    this.authService.login(credentials).subscribe(
      () => {
        if (this.authService.isLoggedIn) {
          this.loginForm.reset();

          // Redirect to the URL from the auth service or default
          this.router.navigate([this.authService.redirectUrl || '']);
        }
      },
      (err) => {
        this.isLoggingIn = false;
        switch (err.status) {
          case 400:
            this.message = 'Incorrect credentials.';
            break;
          default:
            this.message = 'Something went wrong.';
            break;
        }
      },
      () => {
        this.isLoggingIn = false;
      }
    );
  }

  logout(): void {
    this.authService.logout();
  }
}

