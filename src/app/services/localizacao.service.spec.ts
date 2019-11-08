import { TestBed } from '@angular/core/testing';

import { LocalizacaoService } from './localizacao.service';

describe('LocalizacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalizacaoService = TestBed.get(LocalizacaoService);
    expect(service).toBeTruthy();
  });
});
