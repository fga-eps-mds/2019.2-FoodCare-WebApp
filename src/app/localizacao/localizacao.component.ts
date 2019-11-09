import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-localizacao',
  templateUrl: './localizacao.component.html',
  styleUrls: ['./localizacao.component.css']
})
export class LocalizacaoComponent implements OnInit {

  public ngOnInit(): void {
    // this.getLocation();
    this.getLocallizacao();
  }
  
  getLocallizacao() {
    var output = document.getElementById("out");

    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      // mostrar coordenadas dentro do alerta
      // alert('Latitude: ' + latitude + 'Longitude: ' + longitude);

      alert('Ta localizada, senhora!')
      // printar na tela as coordenadas
      output.innerHTML = '<p>Latitude: ' + latitude + '° <br>Longitude: ' + longitude + '°</p>';

      // "Salvar" no console os dados obtidos
      console.log("Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude);
    }

    function error() {
      output.innerHTML = "Seu navegador não lhe permite, senhora!";
    }

    if (!navigator.geolocation) {
      output.innerHTML = "<p>A permissão de localização não está ativada!</p>";
      return;
    }
  }

}