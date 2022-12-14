import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Dish } from '../models/dish.model';
import { Token } from '@angular/compiler';

@Injectable({
    providedIn: 'root'
  })
export class DishService {

    constructor( private http: HttpClient) { }

    AddNewDishToDb(dish:Dish) : Observable<Object> {
        return this.http.post<Object>(environment.serverURL + '/api/dishes/newDish', dish);
    }

    ReadDishesFromDb() : Observable<Dish[]>{
        return this.http.get<Dish[]>(environment.serverURL + '/api/dishes/all');
    }

    DeleteDish(dish: Dish): Observable<Token>{
        return this.http.post<Token>(environment.serverURL + '/api/dishes/deleteDish', dish);
    }
}