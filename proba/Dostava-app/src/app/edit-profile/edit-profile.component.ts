import { useAnimation } from '@angular/animations';
import { Token } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user: User = new User("","","","","",new Date(),"", "", "", "");
  tempPassword: string = "";
  pass: string = "";
  passR: string = "";
  hasImage: boolean = false;
  image: SafeUrl = "";
  tokenId: any;
  newImage: string = "";
  chooseImage: boolean = false;
  tokenEmail: any;

  public editForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    passwordRepeat: new FormControl('', Validators.required),
    name: new FormControl ('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    picture: new FormControl(null)
  });

  constructor(private router: Router, public userService: UserService, private sanitizer : DomSanitizer, public jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    if (localStorage.getItem('email') != null){
      const token: any = localStorage.getItem('token');
      var x = this.jwtHelper.decodeToken(token);
      var userType= x['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      this.tokenId = localStorage.getItem('usersId');
      this.tokenEmail = localStorage.getItem('email');
      var temp: string = "";
      if(userType != 'Deliverer'){
        this.userService.getUserByEmail(this.tokenEmail).subscribe(
          (data: User) => {
            this.user.username = data.username;
            this.user.email = data.email;
            this.user.password = data.password;
            //this.user.password = this.editForm.controls["password"].value;
            this.user.name = data.name;
            this.user.lastName = data.lastName;
            this.user.dateOfBirth = data.dateOfBirth;
            this.user.address = data.address;
            this.user.typeOfUser = data.typeOfUser;
            this.user.status = data.status; 
            this.pass = data.password;
            this.passR = data.password;
            this.user.imageURL = data.imageURL;
            if(this.user.imageURL != null){
              this.userService.ReadImage(this.tokenId, this.user.imageURL, this.user.typeOfUser).subscribe(
                data =>{
                  this.image = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(data));               
                }
              );
              this.hasImage = true; 
            }              
          },
          error => {
  
          }
        );
      }
      else{
        this.userService.GetDelivererById(this.tokenId).subscribe(
          (data: User) => {
            this.user.username = data.username;
            this.user.email = data.email;
            this.user.password = data.password;
            //this.user.password = this.editForm.controls["password"].value;
            this.user.name = data.name;
            this.user.lastName = data.lastName;
            this.user.dateOfBirth = data.dateOfBirth;
            this.user.address = data.address;
            this.user.typeOfUser = data.typeOfUser;
            this.user.status = data.status; 
            this.pass = data.password;
            this.passR = data.password;
            this.user.imageURL = data.imageURL;
            if(this.user.imageURL != null){
              this.userService.ReadImage(this.tokenId, this.user.imageURL, this.user.typeOfUser).subscribe(
                data =>{
                  this.image = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(data));               
                }
              );
              this.hasImage = true; 
            }              
          },
          error => {}
        );
      }
    }
    else{
      this.router.navigate(['/']);
    }
  }

  onSelectImage(event:Event){
    const file = (event.target as HTMLInputElement).files![0];
    if(!file)
    {
      this.newImage = '';
      return;
    }
      
    this.editForm.patchValue({picture: file});
    this.editForm.get('picture')!.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.newImage = reader.result!.toString();
    };
    reader.readAsDataURL(file);
  }

  getUsernameErrorMessage(){  //1
    if(this.editForm.get('username')?.hasError('required')){  
      return 'Username is required';
    }      
    return '';
  }

  getEmailErrorMessage1(){  //2
    if(this.editForm.get('email')?.hasError('email')){  
      return 'Email form iz wrong';
    }      
    return '';
  }
  
  getEmailErrorMessage2(){  //3
    if(this.editForm.get('email')?.hasError('required')){  
      return 'Email is required';
    }  
    return '';
  }
  
  getPasswordReqErrorMessage(){ //4
    if(this.editForm.get('password')?.hasError('required')){  
      return "Password is required";
    }  
    return '';
  }
  
  getPasswordErrorMessage(){  //5
    if(this.editForm.get('password')?.hasError('pattern') == true){  
      return "Password must contains minimum eight characters, at least one uppercase letter, one lowercase letter, one number and special character.";
    }  
    return '';
  }
  
  getSecondPasswordErrorMessage(){  //6
    if(this.editForm.get('passwordRepeat')?.hasError('required') == true){  
      return "Value Required";
    }  
    return '';
  }
  
  getSecondPasswordErrorMessage2(){   //7
    if(this.editForm.get('passwordRepeat')?.value != this.editForm.get('password')?.value){
      return "Password must match";
    }  
    return '';
  }

  getNameErrorMessage(){  //8
    if(this.editForm.get('name')?.hasError('required') == true){  
      return 'Name is required';
    }  
    return '';
  }

  getLastNameErrorMessage(){  //9
    if(this.editForm.get('lastName')?.hasError('required') == true){  
      return 'Last name is required';
    }  
    return '';
  }
  
  getAddressErrorMessage(){ //10
    if(this.editForm.get('address')?.hasError('required') == true){  
      return 'Address is required';
    }  
    return '';
  }
  
  getDateErrorMessage(){  //11
    if(this.editForm.get('dateOfBirth')?.hasError('required') == true){  
      return 'Date is required';
    }  
    return '';
  }
  
  getUserTypeErrorMessage(){
    if(this.editForm.get('userType')?.hasError('required') == true){
      return 'User Type is required';
    }
    return '';
  }

  OnSubmitChanges(){
    if(this.editForm.valid){
      if(this.editForm.get('passwordRepeat')?.value != this.editForm.get('password')?.value){
        alert("Passwords must match");
      }
      else{
        //if(this.tempPassword != ""){ this.user.password = this.tempPassword; }
        this.user.password = this.pass;
        this.userService.editUserInDb(this.user).subscribe(
          data => {
            if(this.newImage != ''){
              this.userService.UploadImage(this.editForm.value.picture, this.tokenId, data.typeOfUser).subscribe(
                data=>{}
              );
            }
            if(data.typeOfUser == "Admin"){
              this.router.navigateByUrl('/indexadmin');
            }
            else if(data.typeOfUser == "Deliverer"){
              this.router.navigateByUrl('/indexdeliverer');
            }
            else if(data.typeOfUser == "Customer"){
              this.router.navigateByUrl('/indexcustomer');
            }
          },
          error => {}
        );
      }
    }
    else{
      alert("Fill in form properly.");
    }
  }

}
