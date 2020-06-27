import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Credentials } from '../models/credentials';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'ffr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  message: string;

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
    this.authService.login(credentials).subscribe(
      () => {
        if (this.authService.isLoggedIn) {
          this.loginForm.reset();

          // Redirect to the URL from the auth service or default
          this.router.navigate([this.authService.redirectUrl || '']);
        }
      },
      (err) => {
        switch (err.status) {
          case 400:
            this.message = 'Incorrect credentials.';
            break;
          default:
            this.message = 'Something went wrong.';
            break;
        }
      }
    );
  }

  logout(): void {
    this.authService.logout();
  }
}
