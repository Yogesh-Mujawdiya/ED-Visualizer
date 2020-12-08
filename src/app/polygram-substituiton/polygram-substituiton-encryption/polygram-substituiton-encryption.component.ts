import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  Key1   : string;
  Key2   : string;
  Key3   : string;
  Text  : string;
}


@Component({
  selector: 'app-polygram-substituiton-encryption',
  templateUrl: './polygram-substituiton-encryption.component.html',
  styleUrls: ['./polygram-substituiton-encryption.component.css']
})
export class PolygramSubstituitonEncryptionComponent implements OnInit {

  Play:boolean;
  Speed:string="100";  
  PlainText:string="RowTransposition";
  CipherText:string;

  Key1:string="0";
  Key2:string="9";
  Key3:string="0";
  Polygram_Reverse:string[];
  Polygram_ASCII:number[];
  Polygram_Add_Key:number[];
  Polygram_Binary:string[];
  Polygram_LSB:string[];
  Polygram_Cipher_ASCII:number[];
  Polygram_Cipher_Text:string[];
  DPolygram_Char:string[];
  DPolygram_Text:string[];
  reverse: string;
  text: string;
  
  takeFourNumbers : any;
  takeFourNumber  : any;
  Running : any;
  Running1 : any;
  Running2 : any;


  constructor(
    public dialogRef: MatDialogRef<PolygramSubstituitonEncryptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.Key1 = this.data.Key1;
    this.Key2 = this.data.Key2;
    this.Key3 = this.data.Key3;
    this.PlainText = this.data.Text;
    
    this.Polygram_Reverse = new Array(this.PlainText.length);
    this.Polygram_ASCII = new Array(this.PlainText.length);
    this.Polygram_Add_Key = new Array(this.PlainText.length);
    this.Polygram_Binary = new Array(this.PlainText.length);
    this.Polygram_LSB = new Array(this.PlainText.length);
    this.Polygram_Cipher_ASCII = new Array(this.PlainText.length);
    this.Polygram_Cipher_Text = new Array(this.PlainText.length);
    this.DPolygram_Char = new Array(this.PlainText.length);
    this.DPolygram_Text = new Array(this.PlainText.length);
  }

  ngOnInit(): void {
  }


  ngOnDestroy(): void {
    if(this.Running != undefined)
        this.Running.unsubscribe();
    if(this.Running1 != undefined)
      this.Running1.unsubscribe();
    if(this.Running2 != undefined)
      this.Running2.unsubscribe();
  }

  PlayEncryptionMethod(){
    let K1 = this.Key1;
    let K2 = this.Key2;
    let K3 = this.Key3;
    let KEY = [K1,K2,K3];
    this.CipherText = '';
    this.Play=true;
    for(let i=0;i<this.PlainText.length;i++){
      let table = document.getElementById("PTD");
      setTimeout(() => {
        this.Polygram_Reverse[i] = this.PlainText[this.PlainText.length-i-1];
        let r1 = table.getElementsByTagName("tr")[i+1];
        let c1 = r1.getElementsByTagName("td")[1];
        let r2= table.getElementsByTagName("tr")[this.PlainText.length-i];
        let c2 = r2.getElementsByTagName("td")[0];
        c2.className = "Activate";
        c1.className = "CodeActivate";
        this.DPolygram_Text[i] = this.DPolygram_Char[this.DPolygram_Char.length-i-1];
        this.text+=this.DPolygram_Text[i];
        if(i==this.PlainText.length-1){
          this.Polygram_SubstituitonCipherText(KEY)
        }
      },1000*(i+1));
    }
  }
 
  validateValue() {
    if (parseInt(this.Speed) > 10000)
      this.Speed = "10000";
    else if (parseInt(this.Speed) < 100 || this.Speed == '')
      this.Speed = "100";
  }

  
  Polygram_SubstituitonCipherText(KEY){
    for(let i=0,x=-5;i<this.PlainText.length;i++){
      let table = document.getElementById("PTD");
      let row = table.getElementsByTagName("tr")[Math.floor(i+1)];
      let cols = row.getElementsByTagName("td");    
      setTimeout(() => {
        this.Polygram_ASCII[i] = this.Polygram_Reverse[i].charCodeAt(0);
        cols[2].className = 'Activate';
        setTimeout(() => {
          cols[3].className = 'Activate';
          cols[2].className = 'DeActivate';
          this.Polygram_Add_Key[i] = this.Polygram_ASCII[i]+parseInt(KEY[i%3]);
        },1000);
        setTimeout(() => {
          cols[4].className = 'Activate';
          cols[3].className = 'DeActivate';
          this.Polygram_Binary[i] = this.Polygram_Add_Key[i].toString(2);
        },2000);
        setTimeout(() => {
          cols[5].className = 'Activate';
          cols[4].className = 'DeActivate';
          this.Polygram_LSB[i] = this.Polygram_Binary[i].slice(0,this.Polygram_Binary[i].length-1)+(this.Polygram_Binary[i][this.Polygram_Binary[i].length-1]=='0' ? '1' : '0');
        },3000);
        setTimeout(() => {
          cols[6].className = 'Activate';
          cols[5].className = 'DeActivate';
          this.Polygram_Cipher_ASCII[i] = parseInt(this.Polygram_LSB[i],2);
        },4000);
        setTimeout(() => {
          cols[7].className = 'CodeDeActivate';
          cols[6].className = 'DeActivate';
          this.Polygram_Cipher_Text[i] = String.fromCharCode(parseInt(this.Polygram_LSB[i],2));
          this.CipherText+=String.fromCharCode(parseInt(this.Polygram_LSB[i],2));
          if(i==this.PlainText.length-1)
            this.Play=false;
        },5000);
      }, 1000*(x+=6));
    }
  }
}
