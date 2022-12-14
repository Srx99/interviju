import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-navbar-customer',
  templateUrl: './navbar-customer.component.html',
  styleUrls: ['./navbar-customer.component.css']
})
export class NavbarCustomerComponent implements OnInit {

  hasImage: boolean = false;
  image: SafeUrl = "";
  tokenId: any;
  tokenEmail: any;

  constructor(private router: Router, private sanitizer : DomSanitizer, public userService: UserService) { }

  ngOnInit(): void {
    this.tokenId = localStorage.getItem('usersId'); 
    this.tokenEmail = localStorage.getItem('email'); 
    this.userService.getUserByEmail(this.tokenEmail).subscribe(
      (data: User) => {
        if(data.imageURL != null){
          this.userService.ReadImage(this.tokenId, data.imageURL, data.typeOfUser).subscribe(
            data1 =>{
              this.image = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(data1));
            }
          );
          this.hasImage = true;
        }        
      }
    );
  }

  OnLogout(){
    if (localStorage.getItem('email') != null){
      localStorage.removeItem('usersId');
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    }
  }

}
