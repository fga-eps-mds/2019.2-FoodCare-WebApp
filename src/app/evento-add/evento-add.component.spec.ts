import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoAddComponent } from './evento-add.component';

describe('EventoAddComponent', () => {
  let component: EventoAddComponent;
  let fixture: ComponentFixture<EventoAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
