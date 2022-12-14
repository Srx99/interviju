import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';
import { Token } from '../models/token.model';
import { DelivererDisplay } from '../models/delivererDisplay.model';
import { Order } from '../models/order.model';
import { OrderDisplay } from '../models/orderDisplay.model';


@Injectable({
    providedIn: 'root'
  })
export class UserService {
  
    constructor( private http: HttpClient) { }
  

    geAlltUsersFromDb() : Observable<User[]> {
      return this.http.get<User[]>(environment.serverURL + '/api/users/all');
    }

    temp: any;
    AddNewUserToDb(usr:User) : Observable<Token> {
        return this.http.post<Token>(environment.serverURL + '/api/users', usr);
        //return this.http.post<Object>('https://localhost:44388/api/users', usr);
    }

    Login(login:Login) : Observable<Token> {
      return this.http.post<Token>(environment.serverURL + '/api/users/login', login)
    }

    loginGoogle(usr:User) : Observable<Token>{
      return this.http.post<Token>(environment.serverURL + '/api/users/google', usr);

    }


    //Na osnovu prodledjenog emaila iscitam datog korisnika
    getUserByEmail(email:string) : Observable<User> {
      return this.http.get<User>(environment.serverURL + `/api/users/${email}`);
    }

    editUserInDb(user: User) : Observable<User> {
      return this.http.post<User>(environment.serverURL + '/api/users/edit', user);
    }

    //Pokupiti usere koji su dostavljaci i ciji je status u procesiranju
    getUnprocessedDeliverer() : Observable<DelivererDisplay[]> {
      return this.http.get<DelivererDisplay[]>(environment.serverURL + '/api/users/unprocessedDeliverers');
    }

    editDeliverer(deliverer: DelivererDisplay) : Observable<DelivererDisplay> {
      return this.http.post<DelivererDisplay>(environment.serverURL + '/api/users/editDeliverer', deliverer);
    }

    getAllDeliverers() : Observable<DelivererDisplay[]> {
      return this.http.get<DelivererDisplay[]>(environment.serverURL + '/api/users/allDeliverers');
    }

    //getUsersId(email: string) : Observable<Token> {
    //  return this.http.post<Token>(environment.serverURL + '/api/users/findUsersId', email);
    //}

    getUsersId(email: string) : Observable<Token> {
      return this.http.get<Token>(environment.serverURL + `/api/users/findUsersId/${email}`);
    }

    getPreviousOrders(userId: number) : Observable<Order[]>{
      return this.http.get<Order[]>(environment.serverURL + `/api/users/usersOrders/${userId}`);
    }

    getCurrentOrders(email: string) : Observable<Order[]>{
      return this.http.get<Order[]>(environment.serverURL + `/api/users/currentOrders/${email}`);
    }

    getDeliverersId(email: string) : Observable<number> {
      return this.http.get<number>(environment.serverURL + `/api/users/findDeliverersId/${email}`);
    }

    getDeliverersPreviousOrders(id: number) : Observable<OrderDisplay[]>{
      return this.http.get<OrderDisplay[]>(environment.serverURL + `/api/users/previousDeliverersOrders/${id}`);
    }

    DelivererHasInProcessOrder(email: string) : Observable<Token>{
      return this.http.get<Token>(environment.serverURL + `/api/users/delivererHasInProcessOrder/${email}`);
  }

    UploadImage(file: File, usersId:number, typeOfUser: string): Observable<Token>{
      const formData: FormData = new FormData();
      formData.append('file', file);
      //return this.http.post<Token>(environment.serverURL + `/api/users/uploacPicture/${usersId}`, formData);      
      return this.http.post<Token>(environment.serverURL + `/api/users/uploacPicture/${usersId}/${typeOfUser}`, formData);      
    }

    ReadImage(userId: number, fileName: string, typeOfUser: string): Observable<any>{
      //return this.http.get<any>(environment.serverURL + `/api/users/readImage/${userId}/${fileName}`);
      let remp = environment.serverURL.concat(`/api/users/readImage/${userId}/${fileName}/${typeOfUser}`);
      return this.http.get(remp, {responseType: 'blob'});
    }

    GetDelivererById(id:number) : Observable<User>{
      return this.http.get<User>(environment.serverURL + `/api/users/getDelivererById/${id}`)
    }

  }