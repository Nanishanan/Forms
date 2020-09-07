import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyServicesService {

  constructor(private _http: HttpClient) { }

  _url = 'http://localhost:3000/userdetails';
  _urlId = 'http://localhost:3000/userdetails';
  _urlUsername = 'http://localhost:3000/userdetails/username';

  getData(){
    return this._http.get<any>(this._url);
  }
  
  getIdData(id){
    return this._http.get<any>(this._url + "/" + id);
  }

  getUsername(username){
    return this._http.get<any>(this._urlUsername + "/" + username);
  }

  saveData(detail){
    return this._http.post<any>(this._url, detail);
  }  

  updateData(id,detail){
    return this._http.put<any>(this._urlId + "/" +id, detail);
  }

}
