import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  
  constructor(public orderService: OrderService, public userService: UserService) { }

  listOfOrders: Order[] = [];

  ngOnInit(): void {
    this.orderService.GetAllOrders().subscribe(
      (data: Order[]) => {
        this.listOfOrders = data;
      }
    );
  }
}
