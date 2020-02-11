import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Alternative } from '../Models/alternative.model';

const corsUrl = "https://cors-anywhere.herokuapp.com/";

@Injectable({
  providedIn: 'root'
})
export class AnalizatorService {

    urlApi = "https://vnforqa-api.herokuapp.com/api/Analizator/";
    corsUrlApi = this.urlApi;

    constructor(private http:HttpClient) { }    
 
    GetSaatyTable(array: Alternative[]) {
      return this.http.post(this.corsUrlApi+"Saaty",array);
    }  

    GetMarkSaatyTable(markArray: Alternative[]) {
      return this.http.post(this.corsUrlApi+"UnrangetSaaty",markArray);
    }

    GetKolSaatyTable(array: Alternative[]) {
      return this.http.post(this.corsUrlApi+"KolSaaty",array);
    }  

    GetSaaty99Table(array: Alternative[]) {
      return this.http.post(this.corsUrlApi+"Saaty99",array);
    }  
    GetVisualSaaty(array: Alternative[]) {
      return this.http.post(this.corsUrlApi+"Geometry",array);
    }  
  }
