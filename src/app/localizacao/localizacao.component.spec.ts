import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizacaoComponent } from './localizacao.component';

describe('LocalizacaoComponent', () => {
  let component: LocalizacaoComponent;
  let fixture: ComponentFixture<LocalizacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalizacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
