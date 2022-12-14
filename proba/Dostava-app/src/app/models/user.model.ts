//Registation form
import { EmailValidator } from "@angular/forms";

export class User{
    public username: string;
    public email: string;
    public password: string;
    public name: string;
    public lastName: string;
    public dateOfBirth: Date;
    public address: string;
    public typeOfUser: string;
    public status: string = ""; //processing, no_status, denied, accepted
    imageURL: string = "";

    constructor(username: string, email: string, password: string, name: string, lastName: string, 
                dateOfBirth: Date, address: string, typeOfUser: string, status : string, image: string)
                {
                    this.username = username;
                    this.email =  email;
                    this.password = password;
                    this.name = name;
                    this.lastName = lastName;
                    this.dateOfBirth = dateOfBirth;
                    this.address = address;
                    this.typeOfUser = typeOfUser;
                    this.status = status;
                    this.imageURL = image;
                }
    
                
                
}