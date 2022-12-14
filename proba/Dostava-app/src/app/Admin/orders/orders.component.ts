import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  //Status: Waiting, done, in process
  ListOfOrders: Order[] = [];

  constructor(public orderService: OrderService) { }

  ngOnInit(): void {
      this.orderService.GetAllOrders().subscribe(
        (data: Order[]) => {
          this.ListOfOrders = data;          
        }
      );
  }

  Submit(){
    this.orderService.GetAllOrders().subscribe(
      (data: Order[]) => {
        this.ListOfOrders = data;    
        alert(data[0].dishName);      
      }
    );
  }

}
