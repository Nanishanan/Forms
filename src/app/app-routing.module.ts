import { UserDetailComponent } from './user-detail/user-detail.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterPageComponent} from './register-page/register-page.component';
import { ProductLstComponent } from './login-page/product-lst.component';
import { EditDetailComponent } from './edit-detail/edit-detail.component';

const routes: Routes = [
  {path:'register-page',component:RegisterPageComponent},
  {path:'',component:ProductLstComponent},
  {path:'app-user-detail',component:UserDetailComponent},
  {path: 'app-edit-detail', component:EditDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
