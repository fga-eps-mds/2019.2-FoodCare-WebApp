import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: any;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }


  ngOnInit() {}

  login(username: string, password: string) {
    this.authService.login(username, password).subscribe(
      success => this.router.navigate(['exibir-doadores']),
      error => this.error = error
    );
  }
}
