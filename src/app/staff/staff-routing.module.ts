import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { StaffComponent } from './staff.component';
import { AddEditComponent } from './add-edit.component';
import { AuthGuard } from '../_helpers';

const routes: Routes = [
    {
        path: '', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: '', component: StaffComponent, canActivate: [AuthGuard] },
            { path: 'add', component: AddEditComponent, canActivate: [AuthGuard] },
            { path: 'edit/:id', component: AddEditComponent, canActivate: [AuthGuard] }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StaffRoutingModule { }