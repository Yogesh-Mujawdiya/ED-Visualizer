import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../homophonic.component';

@Component({
  selector: 'app-homophonic-encryption',
  templateUrl: './homophonic-encryption.component.html',
  styleUrls: ['./homophonic-encryption.component.css']
})
export class HomophonicEncryptionComponent implements OnInit {
  Speed: string ="100";
  text: string;
  Play: boolean;
  Keys: any;
  HKeys:any;
  PlainText: string;
  CipherText:string;
  HDRKeys: any;
  Homophonic_Cipher_Text : any;

  constructor(
    public dialogRef: MatDialogRef<HomophonicEncryptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    console.log(data)
    this.Keys = this.data.Keys;
    this.PlainText = this.data.Text;
    let n = this.Keys[0].Replacement[0].length;
    let m = this.PlainText.length;
    this.HDRKeys =  new Array(Math.floor(m/n));
    this.Homophonic_Cipher_Text = new Array(m);
    this.text = " ".repeat(m);  
    this.HKeys = {} 
    for(let i=0;i<this.Keys.length;i++){
      this.HKeys[this.Keys[i].Letter]=this.Keys[i].Replacement;
    } 
  }

  ngOnInit(): void {
  }

  
  validateValue() {
    if (parseInt(this.Speed) > 10000)
      this.Speed = "10000";
    else if (parseInt(this.Speed) < 100 || this.Speed == '')
      this.Speed = "100";
  }

  PlayEncryptionMethod() {
    this.CipherText = ""
    this.Play = true;
    let table = document.getElementById("HTE");
    let rows = table.getElementsByTagName("tr");
    for(let i=0;i<rows.length;i++){
      let col = rows[i].getElementsByTagName("td");
      for(let j=0;j<col.length;j++){
        col[j].className = 'Normal';
      }
    }
    for(let i=0;i<this.PlainText.length;i++){
      let col = rows[i+1].getElementsByTagName('td');
      setTimeout(() => {
        setTimeout(() => {

          col[1].className="Activate";
        }, 200);
        setTimeout(() => {
          col[1].className="Normal";
        }, 400);
        setTimeout(() => {
          col[1].className="Activate";
        }, 600);
        setTimeout(() => {
          col[1].className="Normal";
        }, 800);
        setTimeout(() => {
          col[1].className="DeActivate";
        }, 1000);
        setTimeout(() => {
          col[1].className="DeActivate";
        }, 1200);
        setTimeout(() => {
          this.Homophonic_Cipher_Text[i] = this.HKeys[this.PlainText[i]][Math.floor(Math.random() * this.HKeys[this.PlainText[i]].length)];
          this.CipherText+=this.Homophonic_Cipher_Text[i];
          col[2].className="CodeActivate";
        }, 1500);
        setTimeout(() => {
          col[2].className="CodeDeActivate";
          if(i==this.PlainText.length-1)
            this.Play = false;
        }, 2000);
      }, 2000*i);
    }
  }
}
