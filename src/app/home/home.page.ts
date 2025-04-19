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
      { name: "Trabajo", coords:[4.725554628473306, -74.07195186321294] },
      { name: "EDS Primax", coords:[4.697256285479593, -74.08420362482532] },
      { name: "Desvio Calle 80", coords:[4.694880205501449, -74.0904346126563] },
      { name: "Calle 80", coords:[4.695946383234945, -74.09023521180816] },
      { name: "Desvio Carrera 69k", coords:[4.688811720798007, -74.0833307419994] },
      { name: "Calle 72", coords:[4.682977462859029, -74.0904822576232] },
      { name: "Av calle 66", coords:[4.676889377643125, -74.09469514523855] },
      { name: "Avenida Rojas", coords:[4.6777020537359535, -74.09583240190406] },
      { name: "Desvio Av Dorado", coords:[4.6618474198547855, -74.11085878793767] },
      { name: "Av Dorado", coords:[4.661708194208028, -74.10901719873333] },
    ]
    
    this.map = L.map('mapId');
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
    
    // Polyline del punto
    const ruta = L.polyline(puntos.map(p => p.coords as [number, number]), { color: 'red' }).addTo(this.map);
    this.map.fitBounds(ruta.getBounds());
    this.map.setZoom(18);
    
    // Marcador de punto
    const customIcon = L.icon({
      iconUrl: 'https://static.thenounproject.com/png/7748759-512.png',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });
    
    puntos.forEach((punto) => {
      L.marker(punto.coords as [number, number], { icon: customIcon })
        .addTo(this.map)
        .bindPopup(punto.name)
        .openPopup();
    });

    let control = 1;
    const intervalId = setInterval(async() => {
      const position = await Geolocation.getCurrentPosition();
      control+=1;

      if (control== 40){
        clearInterval(intervalId);
      }
    }, 30000);
    
    // Ajustar mapa al Punto 
    // this.map = L.map('mapId').setView([4.725554628473306, -74.07195186321294], 18);

    // Obtener posicion del dispositivo
    /*
    const position = await Geolocation.getCurrentPosition();
    const { latitude, longitude } = position.coords;
    console.log('Current position:', latitude, longitude);
    */

    // Nombre del punto 
    /*
    L.marker([latitude, longitude], { icon: customIcon })
       .addTo(this.map)
       .bindPopup('Estoy aquí!')
       .openPopup();
    */
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

}