import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements AfterViewInit {
  private map !: L.Map;

  constructor() {}
 
  ngAfterViewInit(): void {
    this.initMap();
  }
 
  initMap(): void {

    var customIcon = L.

    this.map = L.map('mapId').setView([4.606449, -74.08132], 18);

    L.tileLayer('https://{s}.title.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy: OpenStreetMap contributors'
    }).addTo(this.map);

    L.marker([4.606449, -74.08132])
      .addTo(this.map)
      .bindPopup('ETITC')
      .openPopup();
  }

  ngOnDestroy(): void{
    if(this.map){
      this.map.remove();
    }
  }
 
}