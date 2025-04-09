import {AfterViewInit, Component} from '@angular/core';
import {Geolocation } from '@capacitor/geolocation';
import {Storage} from '@ionic/storage-angular';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})

export class HomePage implements AfterViewInit {

  ngAfterViewInit(): void {
      this.initMap();
  }

  constructor(private _Storage: Storage) { }

  private map!: L.Map;

  async initMap(): Promise<void> {

    await this._Storage.create();

    let control = 0;

    const customIcon = L.icon({
      iconUrl: 'assets/icon/marker-map.png',
      iconSize: [40, 56],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });

    const position = await Geolocation.getCurrentPosition();
    this.map = L.map('mapId').setView([position.coords.latitude, position.coords.longitude], 18);
    const marker = L.marker([position.coords.latitude, position.coords.longitude], {icon: customIcon}).addTo(this.map);
    marker.bindPopup('Ubicación actual').openPopup();

    const intervalID = setInterval(() => {
      control += 1;
      if (control == 40) {
        clearInterval(intervalID);
      }
    }, 60000);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);
  }



  // Reinicio de aplicacion
  // ngOnDestroy(): void {
  //   if (this.map) {
  //     this.map.remove();
  //   }
  // }
}


// Profesor
/*
import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements AfterViewInit {
  private map!: L.Map;

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  async initMap(): Promise<void> {

    const puntos = [
      { name: "ETITC", coords: [4.606449, -74.08132] },
      { name: "CIGARRERIA", coords: [4.605357, -74.080991] },
      { name: "TIENDA ESQUINA", coords: [4.604191, -74.080058] },
      { name: "MADECENTRO", coords: [4.603564, -74.079347] },
      { name: "CELULARES", coords: [4.603114, -74.078811] },
    ];

    // const position = await Geolocation.getCurrentPosition();
    // const { latitude, longitude } = position.coords;
    // console.log('Current position:', position);

    let control = 0;

    const intervalId = setInterval(async () => {

      const position = await Geolocation.getCurrentPosition();

      control += 1;

      if (control == 40) {
        clearInterval(intervalId);
      }

    }, 5000);

    this.map = L.map('mapId').setView([4.606449, -74.08132], 18);

    const customIcon = L.icon({
      iconUrl: 'assets/icon/marker-map.png',
      iconSize: [40, 56],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });

    const ruta = L.polyline(puntos.map(p => p.coords as [number, number]), { color: 'red' }).addTo(this.map);

    this.map.fitBounds(ruta.getBounds());

    this.map.setZoom(18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    puntos.forEach((punto) => {
      L.marker(punto.coords as [number, number], { icon: customIcon })
        .addTo(this.map)
        .bindPopup(punto.name)
        .openPopup();
    });

  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

}
 */

// Puntos conectados
