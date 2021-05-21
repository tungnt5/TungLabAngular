import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login';
import { LayoutComponent } from './staff/layout.component';
import { StaffComponent } from './staff/staff.component';
import { AuthGuard } from './_helpers';

const staffModule = () => import('./staff/staff.module').then(x => x.StaffModule);

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    //{ path: '', component: LayoutComponent, canActivate: [AuthGuard] },
    { path: 'staff', loadChildren: staffModule, canActivate: [AuthGuard] },

    // otherwise redirect to staff
    { path: '**', redirectTo: 'staff' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
