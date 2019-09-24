import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Plugins, Capacitor } from '@capacitor/core';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit, AfterViewInit {
  @ViewChild('mapView', { static: false }) mapElementRef: ElementRef; //this is imorted from angular core allows us to access referenced elements inside the view.
  map: any;
  constructor(private renderer: Renderer2,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController, 
    private router: Router) //render2 allow us to interract with DOM elements inside of angular. which is preferrable to directly manipulating them.
  {

  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.WatchLocation();
  }

  ngAfterViewInit() {
    this.getGoogleMaps().then(googleMaps => { //google map sdk object is returned. Contains different methods for rendering the map.
      const mapEl = this.mapElementRef.nativeElement;//get reference to a map element in your view
      //render the map: the map takes a first argument of an element reference second argument is a starting configuration for the map.
      this.map = new googleMaps.Map(mapEl, { //store the map in a constant so we can interract with it some more.
        center: { lat: 4.952963, lng: -1.744269 }, //defines the coredinates the map should settle on. take an object with a lattitude and a logitued
        zoom: 16 //how far we are zoomed in
      });;


      //fire this event once the map has been fully loaded.
      googleMaps.event.addListenerOnce(this.map, 'idle', () => {
        this.renderer.addClass(mapEl, 'visible'); // add a class to the map element.
      }) //we listen to this once because we simply want the first initial download.
    }).catch(err => {
      console.log(err)
    });
  }

  private getGoogleMaps(): Promise<any> {
    const win = window as any; //refers to the document window.
    const googleModule = win.google; //stores the google module when it is loaded
    if (googleModule && googleModule.maps) { //check if maps have been loaded into google module
      return Promise.resolve(googleModule.maps) //return the google module maps property which contain all the functions.
    }

    return new Promise((resolve, reject) => { // the promise will be resolve if successful or reject if there is an error.
      const script = document.createElement('script'); //create a script element for injection into the DOM.
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyARcyiE8tQCyrzJ9MWNHyLw1srY03ZWPbs' // get the src attribute of the script element to contain this api key
      script.async = true; //set the async attribute of the following api key
      script.defer = true; //set the async attribute of the following api key

      document.body.appendChild(script); //append the child inside the body element of the page.

      //set listener to the script element to fire after the map SDK has been loaded.
      script.onload = () => {
        //when the module is loaded, it will be stored in a module with a property name google inside the window object of our DOM
        const loadedGoogleModule = win.google; //set the empty google module on the window to loaded google module.
        if (loadedGoogleModule && loadedGoogleModule.maps) { //check if the window contains a google module inside loadedGooogle module.
          resolve(loadedGoogleModule.maps); //the resolve is the same as the return key but it is used inside of promises.
        }
        else {
          reject('Google maps SDK not available.');
        }
      }
    })
  }

  WatchLocation() {
    if (!Capacitor.isPluginAvailable('Geolocation')) { //check if the geolocation plugin is available.
      this.showGeolocationError('Could not access location please check location permissions and your data access to try again.') //show error message
      return
    }

    Plugins.Geolocation.watchPosition({
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 1000
    }, (position, err) => {
      if (err) {
        this.showGeolocationError("Cannot track location, check your network connection")
        console.log(err)
      }
      console.log(position.coords);
      //set a new map location.    
      this.getGoogleMaps().then(googleMaps => {
        //this method will get the current map location and then display it.
      })
    });

  }
  // Plugins.Geolocation.getCurrentPosition().then(geoPosition=>{ //returns a goeposition object.
  //     const coordinates: any = {
  //       lat: geoPosition.coords.latitude, //get latitude from the goeposition object.
  //       lng: geoPosition.coords.longitude //get longitude from the geoposition object.
  //     }
  // }).catch(err=>{ //return an error object.
  //   this.showGeolocationError();
  //   console.log('Geoposition error: ', err)
  // })

  //show an alert controller 
  showGeolocationError(mssg: string) {
    this.alertCtrl.create({ //create and show these buttons on the alert page.
      header: 'Error accessing location',
      message: mssg,
      buttons: [{
        text: 'Retry', handler: () => {
          this.WatchLocation(); //retry watch location again.
        }
      }, { text: 'Cancel', role: 'cancel' }]
    }).then(alertEl => {
      alertEl.present();
    })
  }

  requestRide(){
    this.actionSheetCtrl.create({
      header: 'Where To?',
      buttons: [
        {
          text: 'Book A Ride',
          icon: 'car',
          handler: () => {
           this.router.navigateByUrl('/main/book-ride');
          }
        },
        {
          text: "Saved Locations",
          icon: 'star',
          handler: () => {
            //navigate to star places page
            this.router.navigateByUrl('/main/saved-location');
          }
        }
      ]
    }).then(actionSheetEl => {
      actionSheetEl.present(); 
    })
  }
}
