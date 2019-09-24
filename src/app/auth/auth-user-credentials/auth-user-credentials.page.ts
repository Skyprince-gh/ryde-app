import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-auth-user-credentials',
  templateUrl: './auth-user-credentials.page.html',
  styleUrls: ['./auth-user-credentials.page.scss'],
})
export class AuthUserCredentialsPage implements OnInit {

  constructor(private router: Router, private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  onBack(){
    console.log('back button pressed')
  }

  onClickImage(){
    console.log("image was clicked");
  }

  //will submit the form when the button is clicked.
  onSubmit(){    
    this.loadingCtrl.create({
      keyboardClose:true,
      message: "Signing up user..."
    }).then(loadingEl=>{
      loadingEl.present();
      setTimeout(()=>{
        loadingEl.dismiss();
        this.router.navigateByUrl('/main')
      },1500)
    })   
  } 

}
