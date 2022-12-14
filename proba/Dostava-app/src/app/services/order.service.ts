import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { Observable, ObservedValueOf } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UnprocessedOrder } from '../models/unprocessedOrder.model';
import { Token } from '../models/token.model';
import { OrderDisplay } from '../models/orderDisplay.model';


@Injectable({
    providedIn: 'root'
  })
export class OrderService{
    
    constructor( private http: HttpClient) { }

    AddNewOrderToDb(order: Order) : Observable<Object>{
        return this.http.post<Object>(environment.serverURL + '/api/orders/addNewOrder', order);
    }

    GetAllOrders() : Observable<Order[]> {
        return this.http.get<Order[]>(environment.serverURL + '/api/orders/getAllOrders');
    }

    GetUnprocessedOrders() : Observable<UnprocessedOrder[]> {
        return this.http.get<UnprocessedOrder[]>(environment.serverURL + '/api/orders/unprocessedOrders');
    }

    AcceptOrder(ordersId: number, deliverersId: number) : Observable<Order>{
        return this.http.get<Order>(environment.serverURL + `/api/orders/acceptOrder/${ordersId}/${deliverersId}`);
    }

    DeliverersCurrentOrder(deliverersId: number) : Observable<OrderDisplay>{
        return this.http.get<OrderDisplay>(environment.serverURL + `/api/orders/deliverersCurrentOrder/${deliverersId}`);
    }

    /*
    DelivererHasInProcessOrder(email: string) : Observable<Token>{
        return this.http.get<Token>(environment.serverURL + `/api/users/delivererHasInProcessOrder/${email}`);
    }

    */
    
    FinishOrder(ordersId: number) : Observable<Order>{
        return this.http.get<Order>(environment.serverURL + `/api/orders/finishedOrder/${ordersId}`);
    }

    getDeliverersPreviousOrders(id: number) : Observable<OrderDisplay[]>{
        return this.http.get<OrderDisplay[]>(environment.serverURL + `/api/users/previousDeliverersOrders/${id}`);
    }

    GetOrderById(ordersId: number) : Observable<OrderDisplay>{
        return this.http.get<OrderDisplay>(environment.serverURL + `/api/orders/getOrderById/${ordersId}`);
    }

    DelivererHasOrder(deliverersId:number) : Observable<boolean>{
        return this.http.get<boolean>(environment.serverURL + `/api/orders/delivererHasOrder/${deliverersId}`);
    }
}