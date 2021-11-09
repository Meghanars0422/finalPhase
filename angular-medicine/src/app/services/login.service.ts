import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Login } from "../common/login";

@Injectable({
    providedIn: 'root'
  })
  export class LoginService {

    private loginUrl = 'http://localhost:8080/api/v1/login';

    constructor(private httpClient: HttpClient) { }

    getLogins(): Observable<Login[]> {

        return this.httpClient.get<GetResponseLogin>(this.loginUrl).pipe(
          map(response => response._embedded.login)
        );
      }

      // login(adminDetail : Login) : Observable<any>  
      // {  
      //     let url = this.loginUrl;  
      //     return this.httpClient.post(url, adminDetail);  
      // }    
  }

  interface GetResponseLogin {
    _embedded: {
      login: Login[];
    }
  }