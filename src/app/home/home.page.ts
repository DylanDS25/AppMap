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

  constructor(private _geolocation: Geolocation) { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  async initMap(): Promise<void> {

    const position = await Geolocation.getCurrentPosition();
    const { latitude, longitude } = position.coords;
    console.log('Current position:', latitude, longitude);
    const customIcon = L.icon({
      iconUrl: 'https://static.thenounproject.com/png/7748759-512.png',
      iconSize: [40, 40],
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