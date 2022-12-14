import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Token } from "../models/token.model";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class EmailService {

    constructor( private http: HttpClient) { }
    
    SendEmail(email: string): Observable<Token>{
        return this.http.get<Token>(environment.serverURL + `/api/email/sendEmail/${email}`);
    }
}