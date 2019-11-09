import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizacaoService {

  constructor() { }


  //   constructor(localization: LocalizationService) {
  //     localization.getLocalization().then(pos=>{
  //       console.log(pos)
  //     });

  // }
  getLocalizacao(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(res => {
        resolve({ longitude: res.coords.longitude, latitude: res.coords.latitude });
      },
        err => {
          reject(err);
        }
      );
    });
  }
}
