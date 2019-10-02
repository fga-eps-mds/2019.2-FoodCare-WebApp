import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionaAlimentoComponent } from './adiciona-alimento.component';

describe('AdicionaAlimentoComponent', () => {
  let component: AdicionaAlimentoComponent;
  let fixture: ComponentFixture<AdicionaAlimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionaAlimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionaAlimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
