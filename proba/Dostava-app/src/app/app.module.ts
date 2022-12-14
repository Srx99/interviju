import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { IndexAdminComponent } from './Admin/index-admin/index-admin.component';
import { NavbarAdminComponent } from './Admin/navbar-admin/navbar-admin.component';
import { VerificationComponent } from './Admin/verification/verification.component';
import { OrdersComponent } from './Admin/orders/orders.component';
import { AddNewItemComponent } from './Admin/add-new-item/add-new-item.component';
import { IndexCustomerComponent } from './Customer/index-customer/index-customer.component';
import { NavbarCustomerComponent } from './Customer/navbar-customer/navbar-customer.component';
import { CurrentOrderComponent } from './Customer/current-order/current-order.component';
import { PreviousOrdersComponent } from './Customer/previous-orders/previous-orders.component';
import { IndexDelivererComponent } from './Deliverer/index-deliverer/index-deliverer.component';
import { NavbarDelivererComponent } from './Deliverer/navbar-deliverer/navbar-deliverer.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { DishService } from './services/dish.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { OrderService } from './services/order.service';
import { AllOrdersComponent } from './Admin/all-orders/all-orders.component';
import { UnprocessedOrdersComponent } from './Deliverer/unprocessed-orders/unprocessed-orders.component';
import { TimerComponent } from './timer/timer.component';
import { OrderHistoryComponent } from './Deliverer/order-history/order-history.component';
import { EmailService } from './services/email.service';
import { MapComponent } from './Deliverer/map/map.component';
import { MapAcceptOrderComponent } from './Deliverer/map-accept-order/map-accept-order.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { AllDishesComponent } from './Admin/all-dishes/all-dishes.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
//import { AuthServiceConfig, GoogleLoginProvider, SocialUser } from 'angular-6-social-login';
//import { SocialLoginModule } from 'angularx-social-login';
//import { AuthService, GoogleLoginProvider, AuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';

export function tokenGetter() {
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    RegisterComponent,
    LoginComponent,
    EditProfileComponent,
    IndexAdminComponent,
    NavbarAdminComponent,
    VerificationComponent,
    OrdersComponent,
    AddNewItemComponent,
    IndexCustomerComponent,
    NavbarCustomerComponent,
    CurrentOrderComponent,
    PreviousOrdersComponent,
    IndexDelivererComponent,
    NavbarDelivererComponent,
    AllOrdersComponent,
    UnprocessedOrdersComponent,
    TimerComponent,
    OrderHistoryComponent,
    MapComponent,
    MapAcceptOrderComponent,
    AllDishesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule, 
    ToastrModule.forRoot(),
    SocialLoginModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:44388"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  ],
  providers: [
    UserService,
    DishService,
    JwtHelperService,
    OrderService,
    EmailService,
    AuthGuardService,
    ToastrService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true, //keeps the user signed in
        providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('148517665605-jspahbqleats6lvlag9kasc2c11b5g7o.apps.googleusercontent.com')
          
        }
        ]
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
