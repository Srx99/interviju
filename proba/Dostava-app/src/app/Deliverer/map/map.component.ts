import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { UnprocessedOrder } from 'src/app/models/unprocessedOrder.model';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  public innerHeight: any;
  public containerHeight!:number;
  private icon:any;
  private orders: UnprocessedOrder[] = [];

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerHeight = window.innerHeight;
    this.containerHeight = this.innerHeight - 76;
  }

  constructor(private orderService: OrderService, private router: Router) { }

  loadOrders(){
    //Ovde treba da promerim da budu unprocessed orders
    this.orderService.GetUnprocessedOrders().subscribe(
      (data: UnprocessedOrder[]) => {
        this.orders = data;
        this.addOrderMarkers(this.orders);
      }
    );
  }

  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    this.initMap();
    this.defineIcons();
    this.loadOrders();
    }

  private defineIcons():void{
    let iconUrl = '../assets/images/icons8-google-maps-old.svg';
    this.icon = L.icon({
      iconUrl,
      iconSize: [41, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 45.2396, 19.8227],
      zoom: 14
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'); /*, {
      maxNativeZoom:19,
      maxZoom: 22,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });*/

    tiles.addTo(this.map); 
  }

  private addOrderMarkers(orders:UnprocessedOrder[]){
    orders.forEach(element => {
      let marker = L.marker([element.lat, element.lon], {icon:this.icon});
      marker.addTo(this.map);  
      marker.on('click', (e) => {
        this.router.navigate(['/mapacceptorder', element.id]);
      });
    });
    
  }

}
