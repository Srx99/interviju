import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.component.html',
  styleUrls: ['./current-order.component.css']
})
export class CurrentOrderComponent implements OnInit {

  emailToken: any;
  listOfOrders: Order[] = [];
  hasOrder: boolean = false;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.emailToken = localStorage.getItem("email");
    this.userService.getCurrentOrders(this.emailToken).subscribe(
      (data : Order[]) => {
        if(data.length == 0){
          this.hasOrder = false;
        }
        else{
          this.hasOrder = true;
          this.listOfOrders = data;
        }
      }
    );

  }

}
