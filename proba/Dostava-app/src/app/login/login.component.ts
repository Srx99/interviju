import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../models/login.model';
import { Token } from '../models/token.model';
import { UserService } from '../services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { importType } from '@angular/compiler/src/output/output_ast';
import { User } from '../models/user.model';
import { GoogleLoginProvider, SocialUser } from 'angularx-social-login';
 import { SocialAuthService } from 'angularx-social-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


loginForm = new FormGroup({
  email: new FormControl('', Validators.required),
  password: new FormControl('', Validators.required),
});

//constructor(private router: Router, public userService: UserService, public jwtHelper: JwtHelperService) { }
constructor(private router: Router, public userService: UserService, public jwtHelper: JwtHelperService, private socialService: SocialAuthService) { }

  ngOnInit(): void {
  }


  
  loginWithGoogle(): void {
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => {this.socialService.authState.subscribe((user : SocialUser) => {
        console.log(user.firstName);
        let newUser: User = new User(
          user.email,
          user.email,
          "guglsifra",
          user.firstName.toString(),
          user.lastName,
          new Date(),
          "Neznanog junaka bb",
          "Customer",
          "no_status",
          ""
        );
        this.userService.loginGoogle(newUser).subscribe(   //Trebam napisati funkciju na serveru loginGoogle koja ce da registruje korisnika ko nije registrovan i loguje ga
        (data : Token) => {
          if(data == null)
          {
            alert('Greska u google autentifikaciji');
          }
          else
          {
            if(data.token == 'vec postoji'){
              alert('Korisnik je vec registrovan obicnom registracijom');
            }
            
          //  TREBA DA SETUJEM ITELE ZA LOKALSTORAGE
          localStorage.setItem('token', data.token);
          localStorage.setItem('email', newUser.email);
          const token: any = localStorage.getItem('token');
          var x = this.jwtHelper.decodeToken(token);
          var id = x['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
          localStorage.setItem('usersId', id);
          this.router.navigateByUrl('/indexcustomer');
          
          }
        },
        );
      });
    });
  }


  OnLoginSubmit(): void{

    let login: Login = new Login();
    login.email = this.loginForm.controls["email"].value;
    login.password = this.loginForm.controls["password"].value;
    let temp: string = "";
    this.userService.Login(login).subscribe(
      (data : Token) => {
        if(data == null){
          alert("Wrong email or password2");
        }
        else{
          localStorage.setItem('token', data.token);
          localStorage.setItem('email', login.email);
          const token: any = localStorage.getItem('token');
          var x = this.jwtHelper.decodeToken(token);
          var id = x['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
          localStorage.setItem('usersId', id);
          var userType= x['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          if(userType == "Admin"){
            localStorage.setItem('adminID', id);
            this.router.navigateByUrl('/indexadmin');
          }
          else if(userType == "Deliverer"){
            localStorage.setItem('delivererId', id);
              this.router.navigateByUrl('/indexdeliverer');
          }
          else if(userType == "Customer"){
            this.router.navigateByUrl('/indexcustomer');
          }
        }        
      },
      error => {
        alert("Wrong email or password");
      }
    );    
  }
}
