import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Alternative } from "../Models/alternative.model";

const corsUrl = "https://cors-anywhere.herokuapp.com/";

@Injectable({
    providedIn: 'root'
  })

export class UserService {

    constructor(private http: HttpClient) {}

    urlApi = "https://vnforqa-api.herokuapp.com/api/SampleData/";
    corsUrlApi = this.urlApi;

    newUser() {
        return this.http.post(this.corsUrlApi+"User",'');
    }

    setCookies(alternatives: Alternative[], type: number) {
        return this.http.post(this.corsUrlApi+"SetCookies",alternatives, { params: new HttpParams().set("type",type.toString())});
    }
    
    getCookies() {
        return this.http.get(this.corsUrlApi+"GetCookies");
    }

    delete() {
        return this.http.get(this.corsUrlApi+"DelCookies");
    }

    setUrel() {
        return this.http.get(this.corsUrlApi+"UserReload");
    }
}