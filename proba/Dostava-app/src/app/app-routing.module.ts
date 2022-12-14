import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewItemComponent } from './Admin/add-new-item/add-new-item.component';
import { AllDishesComponent } from './Admin/all-dishes/all-dishes.component';
import { AllOrdersComponent } from './Admin/all-orders/all-orders.component';
import { IndexAdminComponent } from './Admin/index-admin/index-admin.component';
import { OrdersComponent } from './Admin/orders/orders.component';
import { VerificationComponent } from './Admin/verification/verification.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { CurrentOrderComponent } from './Customer/current-order/current-order.component';
import { IndexCustomerComponent } from './Customer/index-customer/index-customer.component';
import { PreviousOrdersComponent } from './Customer/previous-orders/previous-orders.component';
import { IndexDelivererComponent } from './Deliverer/index-deliverer/index-deliverer.component';
import { MapAcceptOrderComponent } from './Deliverer/map-accept-order/map-accept-order.component';
import { MapComponent } from './Deliverer/map/map.component';
import { OrderHistoryComponent } from './Deliverer/order-history/order-history.component';
import { UnprocessedOrdersComponent } from './Deliverer/unprocessed-orders/unprocessed-orders.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'editprofile', component: EditProfileComponent,
  outlet: "primary",
    canActivate: [AuthGuardService],
    data:{
      roles:['Admin', 'Deliverer', 'Customer']
    }
  },
  {path: 'indexadmin', component: IndexAdminComponent,
    outlet: "primary",
    canActivate: [AuthGuardService],
    data:{
      roles:['Admin']
    }
  },
  {path: 'adminverification', component: VerificationComponent,
  outlet: "primary",
  canActivate: [AuthGuardService],
  data:{
    roles:['Admin']
  }
  },
  {path: 'adminorders', component: AllOrdersComponent,
  outlet: "primary",
    canActivate: [AuthGuardService],
    data:{
      roles:['Admin']
    }
  },
  {path: 'addnewitem', component: AddNewItemComponent,
  outlet: "primary",
  canActivate: [AuthGuardService],
  data:{
    roles:['Admin']
   }
  },
  {path: 'indexcustomer', component: IndexCustomerComponent,
    outlet: "primary",
    canActivate: [AuthGuardService],
    data:{
      roles:['Customer']
    }
  },
  {path: 'currentorder', component: CurrentOrderComponent,
  outlet: "primary",
    canActivate: [AuthGuardService],
    data:{
      roles:['Customer']
    }
  },
  {path: 'previousorders', component: PreviousOrdersComponent,
  outlet: "primary",
    canActivate: [AuthGuardService],
    data:{
      roles:['Customer']
    }
  },
  {path: 'indexdeliverer', component: IndexDelivererComponent,
  outlet: "primary",
    canActivate: [AuthGuardService],
    data:{
      roles:['Deliverer']
    }
  },
  {path: 'unprocessed', component: UnprocessedOrdersComponent,
  outlet: "primary",
    canActivate: [AuthGuardService],
    data:{
      roles:['Deliverer']
    }
  },
  {path: 'orderhistory', component: OrderHistoryComponent,
  outlet: "primary",
    canActivate: [AuthGuardService],
    data:{
      roles:['Deliverer']
    }
  },
  {path: 'map', component: MapComponent,
  outlet: "primary",
  canActivate: [AuthGuardService],
  data:{
    roles:['Deliverer']
  }
  },
  {path: 'mapacceptorder/:id', component: MapAcceptOrderComponent},
  {path: 'alldishes', component: AllDishesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
