import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DoadorService } from './doador.service';

describe('DoadorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  it('should be created', () => {
    const service: DoadorService = TestBed.get(DoadorService);
    expect(service).toBeTruthy();
  });
});
