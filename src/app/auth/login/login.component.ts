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
  submitted = false;

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

  onSubmit(data) {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    console.log(data);
    this.login(data.usuario, data.senha);
  }
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

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
  MustMatch = (controlName: string, matchingControlName: string) => {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

}
