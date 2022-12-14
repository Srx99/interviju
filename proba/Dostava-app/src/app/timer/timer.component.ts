import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
//import { allowedNodeEnvironmentFlags } from 'process';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  @Input('data') childMessage: Date = new Date();
  @Input('idOrder') childMessage2: number = -1;

  constructor(public orderService: OrderService) { }

  demo: string = ""; 
  ngOnInit(): void {
    //var countDownDate = this.childMessage.getTime();
    var countDownDate1 = new Date(this.childMessage);
    var countDownDate = countDownDate1.getTime();
    var x = setInterval(() =>{
      var now1 = new Date();
      var now = new Date().getTime();
      var distance = countDownDate - now;
      var days = Math.floor(distance/(1000*60*60*24));
      var hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
      var minutes = Math.floor((distance % (1000*60*60))/ (1000*60));
      var seconds = Math.floor((distance % (1000*60)) / 1000);
      this.demo = minutes + " min " + seconds + " s";
      if(minutes < 0 || seconds <0){
        minutes = 0;
        seconds = 0;
      }
      if(minutes === 0 && seconds === 0){
        minutes = 0;
        seconds = 0;
        this.orderService.FinishOrder(this.childMessage2).subscribe(
          data => {
            setTimeout(() => {
              window.location.reload();
            }, 300);
          }
        );
        clearInterval(x);
      }      
    });
  }

}
