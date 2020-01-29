import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Alternative } from "../Models/alternative.model";


@Injectable({
    providedIn: 'root'
  })

export class UserService {

    constructor(private http: HttpClient) {}

    urlApi = "/api/SampleData/";

    newUser() {
        return this.http.post(this.urlApi+"User",'');
    }

    setCookies(alternatives: Alternative[], type: number) {
        return this.http.post(this.urlApi+"SetCookies",alternatives, { params: new HttpParams().set("type",type.toString())});
    }
    
    getCookies() {
        return this.http.get(this.urlApi+"GetCookies");
    }

    delete() {
        return this.http.get(this.urlApi+"DelCookies");
    }

    setUrel() {
        return this.http.get(this.urlApi+"UserReload");
    }
}