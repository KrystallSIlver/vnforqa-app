import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Alternative } from '../Models/alternative.model';

@Injectable({
  providedIn: 'root'
})
export class AnalizatorService {

    urlApi = "https://vnforqa-api.herokuapp.com/api/Analizator/";
    constructor(private http:HttpClient) { }    
 
    GetSaatyTable(array: Alternative[]) {
      return this.http.post(this.urlApi+"Saaty",array);
    }  

    GetMarkSaatyTable(markArray: Alternative[]) {
      return this.http.post(this.urlApi+"UnrangetSaaty",markArray);
    }

    GetKolSaatyTable(array: Alternative[]) {
      return this.http.post(this.urlApi+"KolSaaty",array);
    }  

    GetSaaty99Table(array: Alternative[]) {
      return this.http.post(this.urlApi+"Saaty99",array);
    }  
    GetVisualSaaty(array: Alternative[]) {
      return this.http.post(this.urlApi+"Geometry",array);
    }  
  }
