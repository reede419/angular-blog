import { AuthGuard } from './shared/services/auth.guard';
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { AuthService } from "./shared/services/auth.service";

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShareModule } from "../shared/shared.module";
import { SearchPosts } from './shared/pipes/search.pipe';

@NgModule({
    declarations: [
        AdminLayoutComponent,
        LoginPageComponent,
        DashboardPageComponent,
        CreatePageComponent,
        EditPageComponent,
        SearchPosts
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ShareModule,
        RouterModule.forChild([
            {
                path: '', component: AdminLayoutComponent, children: [
                    {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
                    {path: 'login', component: LoginPageComponent},
                    {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
                    {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
                    {path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]},

                ]
            }
        ])
    ],
    exports: [RouterModule],
    providers:[AuthGuard]

})

export class AdminModule {

}