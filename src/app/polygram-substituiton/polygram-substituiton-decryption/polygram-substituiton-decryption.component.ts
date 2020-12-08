import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  Key1   : string;
  Key2   : string;
  Key3   : string;
  Text  : string;
}

@Component({
  selector: 'app-polygram-substituiton-decryption',
  templateUrl: './polygram-substituiton-decryption.component.html',
  styleUrls: ['./polygram-substituiton-decryption.component.css']
})
export class PolygramSubstituitonDecryptionComponent implements OnInit {
  
  
  Play:boolean;
  Speed:string="100";  
  CipherText:string;
  PlainText:string;
  Key1:string="0";
  Key2:string="9";
  Key3:string="0";
  EncryptionPanelState:boolean;
  DecryptionPanelState:boolean;
  PlayEncryption:boolean;
  PlayDecryption:boolean;
  cipherText:string;
  plainText:string;
  DPolygram_Cipher_ASCII:number[];
  DPolygram_Binary:string[];
  DPolygram_LSB:string[];
  DPolygram_Sub_Key:number[];
  DPolygram_ASCII:number[];
  DPolygram_Char:string[];
  DPolygram_Text:string[];
  reverse: string;
  text: string;
  Running: any;
  Running1: any;
  Running2: any;


  constructor(
    public dialogRef: MatDialogRef<PolygramSubstituitonDecryptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.Key1 = this.data.Key1;
    this.Key2 = this.data.Key2;
    this.Key3 = this.data.Key3;
    this.CipherText = this.data.Text;

    this.DPolygram_ASCII = new Array(this.CipherText.length);
    this.DPolygram_Sub_Key = new Array(this.CipherText.length);
    this.DPolygram_Binary = new Array(this.CipherText.length);
    this.DPolygram_LSB = new Array(this.CipherText.length);
    this.DPolygram_Cipher_ASCII = new Array(this.CipherText.length);
    this.DPolygram_Char = new Array(this.CipherText.length);
    this.DPolygram_Text = new Array(this.CipherText.length);
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

  
 
  validateValue() {
    if (parseInt(this.Speed) > 10000)
      this.Speed = "10000";
    else if (parseInt(this.Speed) < 100 || this.Speed == '')
      this.Speed = "100";
  }


  PlayDecryptionMethod(){
    let KEY = [this.Key1.charCodeAt(0),this.Key2.charCodeAt(0),this.Key3.charCodeAt(0)];
    this.reverse='';
    this.plainText='';
    for(let i=0,x=-5;i<this.CipherText.length;i++){
      let table = document.getElementById("PTE");
      let row = table.getElementsByTagName("tr")[Math.floor(i+1)];
      let cols = row.getElementsByTagName("td");    
      setTimeout(() => {
        this.DPolygram_Cipher_ASCII[i] = this.CipherText[i].charCodeAt(0);
        cols[1].className = 'Activate';
        setTimeout(() => {
          cols[2].className = 'Activate';
          cols[1].className = 'DeActivate';
          this.DPolygram_Binary[i] = this.DPolygram_Cipher_ASCII[i].toString(2);
        },1000);
        setTimeout(() => {
          cols[3].className = 'Activate';
          cols[2].className = 'DeActivate';
          this.DPolygram_LSB[i] = this.DPolygram_Binary[i].slice(0,this.DPolygram_Binary[i].length-1)+(this.DPolygram_Binary[i][this.DPolygram_Binary[i].length-1]=='0' ? '1' : '0');
        },2000);
        setTimeout(() => {
          cols[4].className = 'Activate';
          cols[3].className = 'DeActivate';
          this.DPolygram_ASCII[i] = parseInt(this.DPolygram_LSB[i],2);
        },3000);
        setTimeout(() => {
          cols[5].className = 'Activate';
          cols[4].className = 'DeActivate';
          this.DPolygram_Sub_Key[i] = this.DPolygram_ASCII[i]-KEY[i%3];
        },4000);
        setTimeout(() => {
          cols[6].className = 'Activate';
          cols[5].className = 'DeActivate';
          this.DPolygram_Char[i] = String.fromCharCode(this.DPolygram_Sub_Key[i])
          if(i==this.CipherText.length-1)
            this.Polygram_SubstituitonPlainText();
        },5000);
      }, 1000*(x+=5));
    }
  }
    
  Polygram_SubstituitonPlainText(){
    for(let i=0;i<this.CipherText.length;i++){
      let table = document.getElementById("PTE");
      setTimeout(() => {        
        let r1 = table.getElementsByTagName("tr")[i+1];
        let c1 = r1.getElementsByTagName("td")[7];
        let r2= table.getElementsByTagName("tr")[this.DPolygram_Char.length-i];
        let c2 = r2.getElementsByTagName("td")[6];
        c2.className = "DeActivate";
        c1.className = "CodeActivate";
        this.DPolygram_Text[i] = this.DPolygram_Char[this.DPolygram_Char.length-i-1];
        this.text+=this.DPolygram_Text[i];
      },1000*(i+1));
    }
  }

}
