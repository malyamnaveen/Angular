import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router:Router,public _http:HttpClient) { }

  ngOnInit(): void {
  }

  userName = "";
  password = "";

  Login(userName,password){


      //this._http.get("http://localhost:8080/")
       

    if(userName == "user" ){
     this.router.navigate(["user"]);
     localStorage.setItem("IsLoggedinApp","true");
    }
    if(userName == "Admin"){
      localStorage.setItem("IsLoggedinApp","true");
      this.router.navigate(["admin"])
    }
  }

}
