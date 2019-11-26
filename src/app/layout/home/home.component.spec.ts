import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    data = {
      nome: "",
      email: "",
      msg: ''
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve chamar sendEmail() atraves de onSubmit()', ()=>{
    spy = spyOn(component, 'sendEmail');
    component.onSubmit(data);
    expect(spy).toHaveBeenCalled();
  });


  it('Deve chamar sendEmail()', ()=>{
    component.sendEmail(null, null, null);
    fixture.detectChanges();
  });

});
