import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { EventoService } from './evento.service';
import { environment } from 'src/environments/environment';

describe('EventoService', () => {
  let eventoService: EventoService;
  let httpMock: HttpTestingController;
  let apiURL = environment.apiURL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventoService]
    })

    eventoService = TestBed.get(EventoService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: EventoService = TestBed.get(EventoService);
    expect(service).toBeTruthy();
  });

  it('should post and get the correct data', () => {
    let eventoTest = { nome: 'nome', desc: 'desc', id_doador: 'id', data_inicio: 'data', data_final: 'data' };
    let eventoId;
    eventoService.createEvento(eventoTest).subscribe(
      (data: any) => {
        expect(data.nome).toBe('nome');
        eventoId = data.id;
      }
    );

    eventoService.getOneEvento(eventoId).subscribe(data => {
      expect(data.nome).toBe('Evento 1');
    });

    const getReq = httpMock.expectOne(
      apiURL + 'evento/' + eventoId + '/',
      'call to api'
    );
    expect(getReq.request.method).toBe('GET');

    const postReq = httpMock.expectOne(
      apiURL + 'evento/',
      'post to api'
    );
    expect(postReq.request.method).toBe('POST');

    postReq.flush({
      nome: 'nome'
    });

    httpMock.verify();
  });
});
