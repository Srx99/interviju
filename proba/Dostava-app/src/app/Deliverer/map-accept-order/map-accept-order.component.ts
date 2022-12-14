import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { OrderDisplay } from 'src/app/models/orderDisplay.model';
import { Token } from 'src/app/models/token.model';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-map-accept-order',
  templateUrl: './map-accept-order.component.html',
  styleUrls: ['./map-accept-order.component.css']
})
export class MapAcceptOrderComponent implements OnInit {

  userIdToken: any;
  orderId: any;
  clieckedOrder: OrderDisplay = new OrderDisplay();
  alreadyHasAnOrder: string = "";
  emailToken: any; 

  constructor(private route:ActivatedRoute, public userService: UserService, private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.userIdToken = localStorage.getItem('delivererId');
    this.emailToken = localStorage.getItem("email");
    this.orderService.GetOrderById(this.orderId).subscribe(
      (data: OrderDisplay) => {
        this.clieckedOrder = data;
      }
    );
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
  }

  AcceptOrder(orderId: number): void{
    this.orderService.AcceptOrder(orderId, this.userIdToken).subscribe(
      data => {
        this.router.navigateByUrl('/indexdeliverer');
      }
    );
  
}

}
