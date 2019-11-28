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

  it('should get the correct event', () => {
    eventoService.getOneEvento(1)
    .subscribe((data: any) => {
      expect(data.nome).toBe('Doação de Alimentos');
    });

    const req = httpMock.expectOne(
      apiURL + 'evento/' + 1 + '/',
      'call to api'
    );
    expect(req.request.method).toBe('GET');

    req.flush({
      nome: 'Doação de Alimentos'
    });

    httpMock.verify();
  });

  it('should post the correct event', () => {
    let eventoTest = { 
      nome: 'Doação de Alimentos', 
      desc: 'Frutas e Verduras que sobraram.', 
      id_doador: '8', 
      data_inicio: '12-12-2012 10:00:00', 
      data_final: '12-12-2012 12:00:00' 
    };
    eventoService.createEvento(eventoTest)
    .subscribe((data: any) => {
      expect(data.nome).toBe('Doação de Alimentos');
    });
  
    const req = httpMock.expectOne(
      apiURL + 'evento/',
      'post to api'
    );
    expect(req.request.method).toBe('POST');
  
    req.flush(eventoTest);
  
    httpMock.verify();
  });

  it('should put the correct event', () => {
    let eventoTest = { 
      desc: 'desc alterada',
    };
    eventoService.updateEvento(3, eventoTest)
    .subscribe((data: any) => {
      expect(data.desc).toBe('desc alterada');
    });

    const putReq = httpMock.expectOne(
      apiURL + 'evento/' + 3 + '/',
      'put to api'
    );
    expect(putReq.request.method).toBe('PUT');

    putReq.flush(eventoTest);

    httpMock.verify();
  })

  it('should delete the correct event', () => {
    eventoService.deleteEvento(3)
    .subscribe((data: any) => {
      expect(data).toBe(3);
    });
  
    const req = httpMock.expectOne(
      apiURL + 'evento/' + 3 + '/',
      'delete to api'
    );
    expect(req.request.method).toBe('DELETE');
  
    req.flush(3);
  
    httpMock.verify();
  });
  
  it('should get the current user', () => {
    eventoService.usuarioLogado()
    .subscribe((data: any) => {
      expect(data.username).toBe('doador');
    });

    const req = httpMock.expectOne(
      apiURL + 'auth/user/',
      'call to api'
    );
    expect(req.request.method).toBe('GET');

    req.flush({
      username: 'doador'
    });

    httpMock.verify();
  });

  it('should get the current responsible', () => {
    eventoService.getResponsavel(1)
    .subscribe((data: any) => {
      expect(data.username).toBe('doador');
    });

    const req = httpMock.expectOne(
      apiURL + 'user/' + 1 + '/',
      'call to api'
    );
    expect(req.request.method).toBe('GET');

    req.flush({
      username: 'doador'
    });

    httpMock.verify();
  });

  it('should open a new tab with google maps', () => {
    const coords = {latitude: -15.8, longitude: -48.8}
    let mapsURL = 
      'https://www.google.com/maps/search/?api=1&query=' + 
      coords.latitude + ',' + coords.longitude;
    
    spyOn(window, 'open').and.callThrough();
    eventoService.abreMaps(coords.latitude, coords.longitude);
    expect(window.open).toHaveBeenCalledWith(mapsURL, '_blank');
  });
});
