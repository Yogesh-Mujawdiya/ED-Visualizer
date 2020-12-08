import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlayfairDecryptionComponent } from './playfair-decryption/playfair-decryption.component';
import { PlayfairEncryptionComponent } from './playfair-encryption/playfair-encryption.component';

export interface DialogData {
  Key   : string;
  Text  : string;
}

@Component({
  selector: 'app-playfair',
  templateUrl: './playfair.component.html',
  styleUrls: ['./playfair.component.css']
})
export class PlayfairComponent implements OnInit {

  Key:string;
  KeyMatrix:any[];
  PlainText:string;
  CipherText:string;
  PlainTextMatrix:any;
  CipherTextMatrix:any;

  constructor(public dialog:MatDialog, private _snackBar: MatSnackBar) {
    this.Key = "HELLO";
    this.PlainText = "YOGESH";
    this.Encryption();
  }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  openEncryptionDialog(){
    if(this.Encryption()){
      const dialogRef = this.dialog.open(PlayfairEncryptionComponent, {
        width   : "98%",
        maxWidth: "800px",
        data: {Key: this.Key, Text: this.PlainText}
      });
    }
  }

  openDecryptionDialog(){
    if(this.Decryption()){
      const dialogRef = this.dialog.open(PlayfairDecryptionComponent, {
        width: '98%',
        maxWidth: '800px',
        data: {Key: this.Key, Text: this.CipherText, Matrix : this.CipherTextMatrix}
      });
    }
  }

  Encryption() : boolean{
    if(this.Key==null || this.Key==''){
      this.openSnackBar("Required Key For Encryption","Error");
      return false;
    }
    this.CipherText = this.PlayfairEncryption(this.Key,this.PlainText);
    return true;
  }
  
  Decryption() : boolean{
    if(this.Key==null || this.Key==''){
      this.openSnackBar("Required Key For Decryption","Error");
      return false;
    }
    this.PlainText = this.PlayfairDecryption(this.Key,this.CipherText);
    return true;
  }
  
  updateKeyMatrix(){
    let K = []
    for(let i of this.Key)
      if(!K.includes(i))
        K.push(i)
    this.KeyMatrix = new Array(5);
    for(let i=0;i<5;i++)
      this.KeyMatrix[i] = new Array(5);
    let c = 'A';
    let l = 0;
    for(let i=0;i<5;i++){
      for(let j=0;j<5;j++){
        if(l<K.length)
          this.KeyMatrix[i][j] = K[l++]
        else{
          while(this.Key.includes(c))
            c=String.fromCharCode(c.charCodeAt(0)+1);
          if(c=='J')
            c=String.fromCharCode(c.charCodeAt(0)+1);
          this.KeyMatrix[i][j] = c;
          c=String.fromCharCode(c.charCodeAt(0)+1);
        }
      }
    }
    console.log(this.KeyMatrix);
  }

  PlayfairEncryption(key:string,msg:string):string{
    this.updateKeyMatrix()
    let cipher = "";
    msg = msg.toUpperCase();
    let M = msg[0]
    for(let i=1;i<msg.length;i++){
      if(msg[i] == msg[i-1])
        M+="X";
      M+=msg[i];
    }
    msg = M;
    if(msg.length%2!=0)
      msg+="X";
    console.log(msg);
    for(let i=0;i<msg.length;i+=2){
      let x1, x2, y1, y2, a, b;
      a = msg[i]
      b = msg[i+1]
      if(a=='J')
        a = 'I'
      if(a=='J')
        b = 'I'
      for(let i=0;i<5;i++){
        for(let j=0;j<5;j++){
          if(a == this.KeyMatrix[i][j]){
            x1 = i;
            y1 = j;
          }
          if(b == this.KeyMatrix[i][j]){
            x2 = i;
            y2 = j;
          }
        }
      }
      if(x1 == x2)
        cipher+=this.KeyMatrix[x1][(y1+1)%5]+this.KeyMatrix[x2][(y2+1)%5];
      else if(y1 == y2)
        cipher+=this.KeyMatrix[(x1+1)%5][y1]+this.KeyMatrix[(x2+1)%5][y2];
      else
        cipher+=this.KeyMatrix[x1][y2]+this.KeyMatrix[x2][y1];
    }
    return cipher; 
  }

  PlayfairDecryption(key:string,cipher:string):string{
    this.updateKeyMatrix()
    let msg = "";
    console.log(cipher);
    for(let i=0;i<cipher.length;i+=2){
      let x1, x2, y1, y2, a, b;
      a = cipher[i]
      b = cipher[i+1]
      if(a=='J')
        a = 'I'
      if(a=='J')
        b = 'I'
      for(let i=0;i<5;i++){
        for(let j=0;j<5;j++){
          if(a == this.KeyMatrix[i][j]){
            x1 = i;
            y1 = j;
          }
          if(b == this.KeyMatrix[i][j]){
            x2 = i;
            y2 = j;
          }
        }
      }
      if(x1 == x2)
        msg+=this.KeyMatrix[x1][(y1-1+5)%5]+this.KeyMatrix[x2][(y2-1+5)%5];
      else if(y1 == y2)
        msg+=this.KeyMatrix[(x1-1+5)%5][y1]+this.KeyMatrix[(x2-1+5)%5][y2];
      else
        msg+=this.KeyMatrix[x1][y2]+this.KeyMatrix[x2][y1];
    }
    return msg; 
  }


}
