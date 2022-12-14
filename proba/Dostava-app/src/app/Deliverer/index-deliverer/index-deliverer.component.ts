import { Component, OnInit } from '@angular/core';
import { DelivererDisplay } from 'src/app/models/delivererDisplay.model';
import { Order } from 'src/app/models/order.model';
import { OrderDisplay } from 'src/app/models/orderDisplay.model';
import { User } from 'src/app/models/user.model';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
//import { PassThrough } from 'stream';

@Component({
  selector: 'app-index-deliverer',
  templateUrl: './index-deliverer.component.html',
  styleUrls: ['./index-deliverer.component.css']
})
export class IndexDelivererComponent implements OnInit {


  currentOrder: OrderDisplay = new OrderDisplay();
  currentOrder1: OrderDisplay = new OrderDisplay();
  tokenEmail: any;
  userIdToken: any;
  verificationStatus: string = "";
  delivererHasOrder: boolean = false;
  num: any;
  time: any;

  constructor(public userService: UserService, public orderService: OrderService) { }

  ngOnInit(): void {  
    var num: number = 0;
    this.tokenEmail = localStorage.getItem('email');
    this.userIdToken = localStorage.getItem('delivererId');
    this.userService.GetDelivererById(this.userIdToken).subscribe(
      (data2: User) => {
        this.verificationStatus = data2.status;
      }
    );
    this.orderService.DelivererHasOrder(this.userIdToken).subscribe(
      (data: boolean) => {
        if(data == true){
          this.delivererHasOrder = true;
          this.orderService.DeliverersCurrentOrder(this.userIdToken).subscribe(
            (data1: OrderDisplay) => {
                this.currentOrder.id = data1.id;
                this.currentOrder.dishName = data1.dishName;
                this.currentOrder.comentar = data1.comentar;
                this.currentOrder.orderAddress = data1.orderAddress;
                this.currentOrder.price = data1.price;
                this.currentOrder.status = data1.status;
                //this.currentOrder.time = new Date(data1.time); //  data1.time;      
                this.currentOrder.time = new Date(data1.time); 
    
            }
          );
        }
        else{
          this.delivererHasOrder = false;
        }
      }
    );
        //num = this.currentOrder.time.getTime();
            //this.currentOrder1.time = new Date(new Date().getTime() + 2*60000)
            
  }

  FinishOrder(ordersId: number) : void{
      this.orderService.FinishOrder(ordersId).subscribe(
        data => {}
      );
      setTimeout(() => {
        window.location.reload();
      }, 300);
  }

}
