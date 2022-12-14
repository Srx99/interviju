import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuardService implements CanActivate{

    constructor(private toastr:ToastrService, private router: Router, private jwtHelper: JwtHelperService){
    }

    canActivate(route: ActivatedRouteSnapshot){
        const token =  localStorage.getItem("token");

        if(!token)
        {
            alert("Please log in.");
            this.router.navigate(["/"]);
            return false;
        }

        if (this.jwtHelper.isTokenExpired(token)){
            alert("Your session has expired, please log in again.");
            this.router.navigate(["/"]);
            return false;
        }

        if (route.data && route.data['roles']){
            let roles:string[] = route.data['roles'];
            const token: any = localStorage.getItem('token');
            var x = this.jwtHelper.decodeToken(token);
            var userType= x['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            if(roles.indexOf(userType) == -1){
                alert("Your are not authorized to view this.");
                this.router.navigate(["/"]);
                return false;
            }
        }

        return true;
    }



  }