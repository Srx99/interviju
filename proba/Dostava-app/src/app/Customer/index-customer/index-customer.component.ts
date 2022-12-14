import { CommaExpr} from '@angular/compiler';
import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
//import { rejects } from 'assert';
//import { resolve } from 'dns';
import { Dish } from 'src/app/models/dish.model';
import { Order } from 'src/app/models/order.model';
import { Token } from 'src/app/models/token.model';
import { User } from 'src/app/models/user.model';
import { DishService } from 'src/app/services/dish.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

declare let paypal: any;

@Component({
  selector: 'app-index-customer',
  templateUrl: './index-customer.component.html',
  styleUrls: ['./index-customer.component.css']
})
export class IndexCustomerComponent implements OnInit, AfterViewChecked {

  addScript: boolean = false;
  
  addedDishes: string = "";
  totalPrice: number = 250;
  address: string = "";
  comment: string = "";
  usersId:any;

  listOfDishes: Dish[] = [];

  listOfOrderedItems: Dish[] = [];

  constructor(private router: Router, public dishService: DishService ,public orderService: OrderService, public userService: UserService) { }

  emailToken: any;

  ngOnInit(): void {
    this.usersId = localStorage.getItem("usersId");
    this.emailToken = localStorage.getItem("email");

    this.dishService.ReadDishesFromDb().subscribe(
      (data: Dish[]) => {
        this.listOfDishes = data;
      }
    );
  }

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AXl0JS0ubLhqOI9ol5TwZpfhdiMlvfI8epZp0SwkYGmy1It_Yru4AtaD93vgTnd29bMMFCb-BKZJULcO',
      production: 'EELmABYgo4ZFCHQS-IPgB6PTGZJYBjqu9Yxl-GqWjzblyWDLUy5rHiqcsguT_2djasVE1WkBxmk2yXgY'
    },
    commit: true, 
    payment: (data: any, actions: any) => {
      return actions.payment.create({
        payment: {
          transactions: [
            {amount: {total: this.totalPrice/100, currency: 'USD'}}
          ]
        }
      });
    },
    onAuthorize: (data:any, actions:any) => {
      return actions.payment.execute().then((payment:any) => {
        //Do something when paymet is succesful
        this.Order();
      })
    }
  };

  ngAfterViewChecked(): void {
    if(!this.addScript){
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
      })
    }
  }

  addPaypalScript(){
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'http://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }


  AddDish(dish: Dish): void{
    this.listOfOrderedItems.push(dish);
    this.addedDishes = this.addedDishes + dish.name + ", ";
    this.totalPrice += dish.price;
  }

  Order(): void{
    let newOrder: Order = new Order();
    
    let tempZaEmail: string = this.emailToken.toString();
    let broj: number = -2;
        newOrder.dishName = this.addedDishes;
        newOrder.amount = this.totalPrice;
        newOrder.clientId = Number(this.usersId); //Number(data.token);
        newOrder.amount = 0;
        newOrder.orderAddress = this.address;
        newOrder.comentar = this.comment;
        newOrder.status = "Waiting";
        newOrder.time = new Date(new Date().getTime() + 2*60000); 
        newOrder.delivererId = -1;
        newOrder.price = this.totalPrice;

        this.orderService.AddNewOrderToDb(newOrder).subscribe(
          data => {
            this.router.navigateByUrl('/currentorder');
          },
          error => {}
          
        );
    
  }

}
