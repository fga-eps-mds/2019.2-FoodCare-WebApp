import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: any;
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  login(username: string, password: string) {
    this.authService.login(username, password).subscribe(
      success => {
        console.log(success);
        this.router.navigate(['eventos-doador']);
      },
      error => {
        this.error = error;
        console.log(error);
        alert("Usuário não encontrado");
      }
    );
  }


}
