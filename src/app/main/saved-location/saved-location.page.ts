import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-saved-location',
  templateUrl: './saved-location.page.html',
  styleUrls: ['./saved-location.page.scss'],
})
export class SavedLocationPage implements OnInit {

  constructor(private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
  }

  displayLocationList(){
    this.actionSheetCtrl.create({
      header: "Recent Destinations",
      buttons: [
        {
          text: 'Sekondi Takoradi',
          icon: 'pin',
          handler: ()=>{
            //pick location
          }
        },
        {
          text: 'Airport Ridge',
          icon: 'pin',
          handler: ()=>{
            //pick location
          }
        },
        {
          text: 'Takoradi Market Circle',
          icon: 'pin',
          handler: ()=>{
            //pick location
          }
        },
        {
          text: 'New Takoradi',
          icon: 'pin',
          handler: ()=>{
            //pick location
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
        }
      ]
    }).then(actionSheetEl=>{
      actionSheetEl.present();
    })
  }
}
