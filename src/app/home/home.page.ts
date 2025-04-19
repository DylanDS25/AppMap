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

    const position = await Geolocation.getCurrentPosition();
    const { latitude, longitude } = position.coords;
    console.log('Current position:', latitude, longitude);
    const customIcon = L.icon({
      iconUrl: 'assets/icon/marker-map.png',
      iconSize: [40, 56],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });

    this.map = L.map('mapId').setView([latitude, longitude], 18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    L.marker([latitude, longitude], { icon: customIcon })
      .addTo(this.map)
      .bindPopup('Estoy aquí!')
      .openPopup();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

}