import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DelivererDisplay } from 'src/app/models/delivererDisplay.model';
import { User } from 'src/app/models/user.model';
import { EmailService } from 'src/app/services/email.service';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

listOfDeliverers: DelivererDisplay[] = [];
hasImage: boolean = false;
image: SafeUrl = "";
delsId: number = -1;

  constructor(private router: Router, public userService: UserService, public emailService: EmailService, private sanitizer : DomSanitizer) { }

  ngOnInit(): void {
    this.userService.getAllDeliverers().subscribe(
      (data: DelivererDisplay[]) => {
        this.listOfDeliverers = data;
      }
    );
  }

  AcceptDeliverer(email: string){
    for (let i = 0; i < this.listOfDeliverers.length; i++){
      if(this.listOfDeliverers[i].email == email){
        this.listOfDeliverers[i].status = "accepted";
        this.userService.editDeliverer(this.listOfDeliverers[i]).subscribe(
          data => { },
          error => {}          
        );
        this.emailService.SendEmail(this.listOfDeliverers[i].email).subscribe(
          data => {}
        );
        setTimeout(() => {
          window.location.reload();
        }, 300);
      }
    }    
  }

  DenyDeluverer(email: string){
    for (let i = 0; i < this.listOfDeliverers.length; i++){
      if(this.listOfDeliverers[i].email == email){
        this.listOfDeliverers[i].status = "denied";
        this.userService.editDeliverer(this.listOfDeliverers[i]).subscribe(
          data => { },
          error => {}          
        );
        setTimeout(() => {
          window.location.reload();
        }, 300);
      }
    }    
  }
}
