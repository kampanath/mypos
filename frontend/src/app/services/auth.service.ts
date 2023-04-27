import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  keyLocalStorage = environment.keyLocalAuthenInfo;

  constructor(private router: Router) { }

  login(token: string){
    localStorage.setItem(this.keyLocalStorage, token);
    this.router.navigate(["/stock"]);
  }

  logout(){
    localStorage.removeItem(this.keyLocalStorage);
    //localStorage.clear();
    this.router.navigate(["/login"]);
  }

  isLogin(){
    return localStorage.getItem(this.keyLocalStorage);
  }
}
