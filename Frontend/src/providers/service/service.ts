import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {

  constructor(public http: HttpClient,public api:ApiProvider) {
    console.log('Hello ServiceProvider Provider');
  }
  addphoto(photo:any){
    let seq = this.api.post('photos/', photo, {headers: { 'Content-Type': 'application/x-www-form-urlencoded'}});
    seq.subscribe();
    return seq;
  }
  getPhoto(photoId:number){
    let seq = this.api.get('photos/' + photoId, null, { responseType: 'json' });
    return seq;
  }
  addphotoAndroid(photo:any){
    let seq = this.api.postAndroid('photos/', photo, {headers: { 'Content-Type': 'application/x-www-form-urlencoded'}});
    seq.subscribe();
    return seq;
  }
}
