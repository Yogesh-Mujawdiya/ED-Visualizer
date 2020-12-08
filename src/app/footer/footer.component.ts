import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  OpenProfile(){
    window.open(
      "https://www.linkedin.com/in/yogesh-mujawdiya/",
      "Profile");
  }
}
