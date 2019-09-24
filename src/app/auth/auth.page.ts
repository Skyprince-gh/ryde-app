import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  //Moves you to the next page
  onNext(){
    this.router.navigateByUrl('/auth/auth-user-credentials') 
  }

}
 