import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDoadorComponent } from './perfil-doador.component';

describe('PerfilDoadorComponent', () => {
  let component: PerfilDoadorComponent;
  let fixture: ComponentFixture<PerfilDoadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilDoadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilDoadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
