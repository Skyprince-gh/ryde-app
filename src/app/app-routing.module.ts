import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth', children: [
      {
        path: '',
        loadChildren: './auth/auth.module#AuthPageModule'
      },
      { path: 'auth-user-credentials', loadChildren: './auth/auth-user-credentials/auth-user-credentials.module#AuthUserCredentialsPageModule' },
    ]
    //{ path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  },
  { path: 'main', children: [
    {
      path: '', 
      loadChildren: './main/main.module#MainPageModule'
    },
    { path: 'trips', loadChildren: './main/trips/trips.module#TripsPageModule' },   
    { path: 'saved-location', loadChildren: './main/saved-location/saved-location.module#SavedLocationPageModule' },
    { path: 'book-ride', loadChildren: './main/book-ride/book-ride.module#BookRidePageModule' },   
  ] },
 
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
