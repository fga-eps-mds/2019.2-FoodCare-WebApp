import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaEventoComponent } from './edita-evento.component';

describe('EditaEventoComponent', () => {
  let component: EditaEventoComponent;
  let fixture: ComponentFixture<EditaEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditaEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
