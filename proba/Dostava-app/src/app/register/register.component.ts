import {  Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { repeat } from 'rxjs';
import { Token } from '../models/token.model';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //public registerForm: FormGroup; 
  public registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
      passwordRepeat: new FormControl('', Validators.required),
      name: new FormControl ('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      userType: new FormControl('', Validators.required),
      picture: new FormControl(null)
  }); 

  imageStr:string = '';
  
  constructor(private route: Router, public userService: UserService) { }

  ngOnInit(): void {
  }

  onSelectImage(event:Event){
    const file = (event.target as HTMLInputElement).files![0];
    if(!file)
    {
      this.imageStr = '';
      return;
    }
      
    this.registerForm.patchValue({picture: file});
    this.registerForm.get('picture')!.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imageStr = reader.result!.toString();
    };
    reader.readAsDataURL(file);
  }

getUsernameErrorMessage(){  //1
  if(this.registerForm.get('username')?.hasError('required')){

    return 'Username is required';
  }    

  return '';
}

getEmailErrorMessage1(){  //2
  if(this.registerForm.get('email')?.hasError('email')){

    return 'Email form iz wrong';
  }    

  return '';
}

getEmailErrorMessage2(){  //3
  if(this.registerForm.get('email')?.hasError('required')){

    return 'Email is required';
  }

  return '';
}

getPasswordReqErrorMessage(){ //4
  if(this.registerForm.get('password')?.hasError('required')){

    return "Password is required";
  }

  return '';
}

getPasswordErrorMessage(){  //5
  if(this.registerForm.get('password')?.hasError('pattern') == true){

    return "Password must contains minimum eight characters, at least one uppercase letter, one lowercase letter, one number and special character.";
  }

  return '';
}

getSecondPasswordErrorMessage(){  //6
  if(this.registerForm.get('passwordRepeat')?.hasError('required') == true){

    return "Value Required";
  }

  return '';
}

getSecondPasswordErrorMessage2(){   //7
  if(this.registerForm.get('passwordRepeat')?.value != this.registerForm.get('password')?.value){

    return "Password must match";
  }

  return '';
}

getNameErrorMessage(){  //8
  if(this.registerForm.get('name')?.hasError('required') == true){

    return 'Name is required';
  }

  return '';
}

getLastNameErrorMessage(){  //9
  if(this.registerForm.get('lastName')?.hasError('required') == true){

    return 'Last name is required';
  }

  return '';
}

getAddressErrorMessage(){ //10
  if(this.registerForm.get('address')?.hasError('required') == true){

    return 'Address is required';
  }

  return '';
}

getDateErrorMessage(){  //11
  if(this.registerForm.get('dateOfBirth')?.hasError('required') == true){

    return 'Date is required';
  }

  return '';
}

getUserTypeErrorMessage(){
  if(this.registerForm.get('userType')?.hasError('required') == true){
    return 'User Type is required';
  }
  return '';
}


OnSubmit(data: FormGroup): void{
  if(this.registerForm.valid){
    if(this.registerForm.get('passwordRepeat')?.value != this.registerForm.get('password')?.value){
      alert("Passwords are not matching");
    }else{
      if(this.registerForm.controls["userType"].value == "Deliverer")
      {
        let newUser: User = new User(
          this.registerForm.controls["username"].value,
          this.registerForm.controls["email"].value,
          this.registerForm.controls["password"].value,
          this.registerForm.controls["name"].value,
          this.registerForm.controls["lastName"].value,
          this.registerForm.controls["dateOfBirth"].value,
          this.registerForm.controls["address"].value,
          this.registerForm.controls["userType"].value,
          "processing",
          ""
        );
        this.userService.AddNewUserToDb(newUser).subscribe(
          (data: Token) =>{
            if(this.imageStr != ''){
              //Pozvati metodu da upload slike iz servisa koja ce da prime File (registerForm.picture) i id(data.id)
              this.userService.UploadImage(this.registerForm.value.picture, Number(data.token), newUser.typeOfUser).subscribe(
                data1 => {}                
              );
            }
            this.route.navigateByUrl('');
          },
          error=>{
          }
        );
      }else{
        let newUser: User = new User(
          this.registerForm.controls["username"].value,
          this.registerForm.controls["email"].value,
          this.registerForm.controls["password"].value,
          this.registerForm.controls["name"].value,
          this.registerForm.controls["lastName"].value,
          this.registerForm.controls["dateOfBirth"].value,
          this.registerForm.controls["address"].value,
          this.registerForm.controls["userType"].value,
          "no_status",
          ""
        );
        this.userService.AddNewUserToDb(newUser).subscribe(
          (data: Token) =>{
            if(this.imageStr != ''){
              alert(data.token)
              this.userService.UploadImage(this.registerForm.value.picture, Number(data.token), newUser.typeOfUser).subscribe(
                data1 => {}                
              );
            }
            this.route.navigateByUrl('');
          },
          error=>{
          }
        );      
      }
    }    
  }
  else
    alert("Fill in the form correctly.")
}

}
