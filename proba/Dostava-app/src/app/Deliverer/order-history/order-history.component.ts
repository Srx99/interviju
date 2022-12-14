import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderDisplay } from 'src/app/models/orderDisplay.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  ListOfOrders: OrderDisplay[] = [];

  constructor(public userService: UserService) { }

  usersId: any;

  ngOnInit(): void {
    this.usersId = localStorage.getItem("delivererId");
    this.userService.getDeliverersPreviousOrders(this.usersId).subscribe(
      (data: OrderDisplay[]) => {
        this.ListOfOrders = data;
      }
    );
  }

}
