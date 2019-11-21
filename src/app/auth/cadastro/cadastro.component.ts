import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cadastro-form',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
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
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: this.MustMatch('password', 'confirmPassword')
    });
  }

  onSubmit(data) {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    // this.onReset();
    console.log(data);
    this.cadastrar(data.username,data.email,data.password,data.confirmPassword);
  }

  get f() { return this.registerForm.controls; }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  cadastrar(username: string, email: string, password1: string, password2: string) {
    this.authService.cadastrar(username, email, password1, password2).subscribe(
      success => {
        alert("Cadastro efetuado com sucesso");
        this.router.navigate(['eventos-doador']),
          console.log('nome')
      },
      error => this.error = error
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
