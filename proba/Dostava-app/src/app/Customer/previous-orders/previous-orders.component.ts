import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-previous-orders',
  templateUrl: './previous-orders.component.html',
  styleUrls: ['./previous-orders.component.css']
})
export class PreviousOrdersComponent implements OnInit {

  ListOfOrders: Order[] = [];

  constructor(public userService: UserService) { }

  userIdToken: any;

  ngOnInit(): void {
    this.userIdToken = localStorage.getItem("usersId");
    this.userService.getPreviousOrders(this.userIdToken).subscribe(
      (data: Order[]) => {
        this.ListOfOrders = data;
      }
    );
  }

}
