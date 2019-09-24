import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AuthUserCredentialsPage } from './auth-user-credentials.page';

const routes: Routes = [
  {
    path: '',
    component: AuthUserCredentialsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AuthUserCredentialsPage]
})
export class AuthUserCredentialsPageModule {}
