import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionaEventoComponent } from './adiciona-evento.component';

describe('AdicionaEventoComponent', () => {
  let component: AdicionaEventoComponent;
  let fixture: ComponentFixture<AdicionaEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionaEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionaEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
