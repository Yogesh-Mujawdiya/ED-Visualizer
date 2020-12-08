import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ED-Visualizer';
  Encryption_Method : string;

  constructor(private router:Router){
    this.Encryption_Method = window.location.pathname.slice(1);
  }
  
  
  ngOnInit() {
  }

  

  onMethodChange(){
    this.router.navigateByUrl(this.Encryption_Method);
  }


  
}
