import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { environment } from 'src/environments/environment';

@Component({
    selector: 'Home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    registerForm: FormGroup;
    submitted = false;


    private apiRoot = environment.apiURL;
    constructor(
        private http: HttpClient,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            nome: ['', Validators.required],
            msg: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
        });
    }

    onSubmit(data) {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }
        this.onReset();
        this.sendEmail(data.nome, data.email, data.msg);
    }

    get f() { return this.registerForm.controls; }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }

    sendEmail(nome: string, email: string, msg: string) {
        return this.http.post(
            this.apiRoot.concat('email/'),
            { nome: nome, email: email, msg: msg }
        ).subscribe(
            success => {
                alert('Email enviado com sucesso!');
            }
        );
    }
}
