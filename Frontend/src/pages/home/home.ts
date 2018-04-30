import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {PhotoModel} from "../../models/models";
import {ServiceProvider} from "../../providers/service/service"
import { Camera, CameraOptions } from '@ionic-native/camera';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public base64Image: string
  private photo: PhotoModel
  private lonlat:any
  constructor(public navCtrl: NavController,public service:ServiceProvider,private camera: Camera) {
        this.photo=new PhotoModel();
  }
  changeListener($event) : void {
    this.readThis($event.target);
  }
  
  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.base64Image = myReader.result;
    }
    myReader.readAsDataURL(file);
  }
  takePicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }
  upload(){
    /*let res=this.service.addphoto(photo);*/

    this.photo.Image=this.base64Image
    this.photo.Lat=Number(this.photo.Lat)
    this.photo.Lon=Number(this.photo.Lon)
  console.log(this.photo)
  this.service.addphoto(this.photo)
        .subscribe((resp) => {

          console.log(resp);
 
          //this.img.ID=uuid;
         
          
        }, (err) => {
          /*loader.dismiss();*/
          //this.navCtrl.pop();
          // Unable to log in
          console.log(err);
        });

  }
  uploadAndroid(){
    this.photo.Image=this.base64Image
    this.photo.Lat=Number(this.photo.Lat)
    this.photo.Lon=Number(this.photo.Lon)
  console.log(this.photo)
  this.service.addphotoAndroid(this.photo)
        .subscribe((resp) => {

          console.log(resp);
 
          //this.img.ID=uuid;
         
          
        }, (err) => {
          /*loader.dismiss();*/
          //this.navCtrl.pop();
          // Unable to log in
          console.log(err);
        });
  }
   
}
