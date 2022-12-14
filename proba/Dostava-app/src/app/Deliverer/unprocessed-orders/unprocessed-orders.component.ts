import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { OrderDisplay } from 'src/app/models/orderDisplay.model';
import { Token } from 'src/app/models/token.model';
import { UnprocessedOrder } from 'src/app/models/unprocessedOrder.model';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-unprocessed-orders',
  templateUrl: './unprocessed-orders.component.html',
  styleUrls: ['./unprocessed-orders.component.css']
})
export class UnprocessedOrdersComponent implements OnInit {

  constructor(public orderService: OrderService, public userService: UserService, private router: Router) { }

  listOfUnprocessedOrders: UnprocessedOrder[] = [];
  emailToken: any;
  usersIdToken: any;
  alreadyHasAnOrder: string = "";
  currOrder: any = null;

  ngOnInit(): void {
    this.emailToken = localStorage.getItem("email");
    this.usersIdToken = localStorage.getItem("delivererId");
    
    this.userService.DelivererHasInProcessOrder(this.emailToken).subscribe(
      (data: Token) => {
        if(data.token == "true"){
          this.alreadyHasAnOrder = "t";
        }
        else{
          this.alreadyHasAnOrder = "f";
        }
      }
    );
    this.orderService.GetUnprocessedOrders().subscribe(
      (data: UnprocessedOrder[]) => {
        this.listOfUnprocessedOrders = data;
      }
    );
    
  }

  AcceptOrder(orderId: number): void{
            this.orderService.AcceptOrder(orderId, this.usersIdToken).subscribe(
              data => {
                this.router.navigateByUrl('/indexdeliverer');
              }
            );
          
  }
}
