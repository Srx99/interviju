import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar-deliverer',
  templateUrl: './navbar-deliverer.component.html',
  styleUrls: ['./navbar-deliverer.component.css']
})
export class NavbarDelivererComponent implements OnInit {

  user: User = new User("","","","","",new Date(),"", "", "", "");
  hasImage: boolean = false;
  image: SafeUrl = "";
  tokenId: any;

  constructor(private router: Router, public userService: UserService, private sanitizer : DomSanitizer) { }

  ngOnInit(): void {
    this.tokenId = localStorage.getItem('usersId'); 
    if (localStorage.getItem('email') != null){

      var tokenEmail = localStorage.getItem('email');
      var temp: string = "";
      if(tokenEmail == undefined){
        temp = "";
      }
      else{
        temp = tokenEmail;
      }
      this.userService.GetDelivererById(this.tokenId).subscribe(
        (data: User) => {
          this.user.username = data.username;
          this.user.email = data.email;
          this.user.password = data.password;
          this.user.name = data.name;
          this.user.lastName = data.lastName;
          this.user.dateOfBirth = data.dateOfBirth;
          this.user.address = data.address;
          this.user.typeOfUser = data.typeOfUser;
          this.user.status = data.status; 
          if(data.imageURL != null){
            this.userService.ReadImage(this.tokenId, data.imageURL, data.typeOfUser).subscribe(
              data1 => {
                this.image = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(data1));
              } 
            );
            this.hasImage = true;
          }
        },
        error => {}
      );
    }
  }

  OnLogout(){
    if (localStorage.getItem('email') != null){
      localStorage.removeItem('delivererId');
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    }
  }

}
