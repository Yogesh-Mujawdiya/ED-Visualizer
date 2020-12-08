import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MonoalphabeticDecryptionComponent } from './monoalphabetic-decryption/monoalphabetic-decryption.component';
import { MonoalphabeticEncryptionComponent } from './monoalphabetic-encryption/monoalphabetic-encryption.component';

export interface DialogData {
  Key   : string;
  Text  : string;
}

@Component({
  selector: 'app-monoalphabetic',
  templateUrl: './monoalphabetic.component.html',
  styleUrls: ['./monoalphabetic.component.css']
})
export class MonoalphabeticComponent implements OnInit {
  Key:string;
  KeyMatrix:any[];
  TextMatrix:any[];
  PlainText:string;
  CipherText:string;

  constructor(public dialog:MatDialog, private _snackBar: MatSnackBar) {
    this.Key = "Yogesh";
    this.PlainText = "MONOALPHABETIC";
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
      const dialogRef = this.dialog.open(MonoalphabeticEncryptionComponent, {
        width   : "98%",
        maxWidth: "800px",
        data: {Key: this.Key, Text: this.PlainText}
      });
    }
  }

  openDecryptionDialog(){
    if(this.Decryption()){
      const dialogRef = this.dialog.open(MonoalphabeticDecryptionComponent, {
        width: '98%',
        maxWidth: '800px',
        data: {Key: this.Key, Text: this.CipherText}
      });
    }
  }

  Encryption() : boolean{
    this.PlainText = this.PlainText.toUpperCase();
    if(this.Key==null || this.Key==''){
      this.openSnackBar("Required Key For Encryption","Error");
      return false;
    }
    this.CipherText = this.MonoalphabeticEncryption(this.Key,this.PlainText);
    return true;
  }
  
  Decryption() : boolean{
    this.CipherText = this.CipherText.toUpperCase();
    if(this.Key==null || this.Key==''){
      this.openSnackBar("Required Key For Decryption","Error");
      return false;
    }
    this.PlainText = this.MonoalphabeticDecryption(this.Key,this.CipherText);
    return true;
  }
  
  UpdateKeyMatrix(){
    this.Key = this.Key.toUpperCase();
    this.KeyMatrix = new Array(26);
    for(let i=0;i<this.Key.length;i++)
      this.KeyMatrix[i] = this.Key[i];
    let char = "A";
    for(let j=this.Key.length;j<26;j++){
      while(this.Key.indexOf(char)!=-1)
        char = String.fromCharCode(char.charCodeAt(0)+1);
      this.KeyMatrix[j] = char;
      char = String.fromCharCode(char.charCodeAt(0)+1);
    }
  }

  MonoalphabeticEncryption(Key:string,text:string):string{
    let cipherText = "";
    this.UpdateKeyMatrix();
    for(let i=0;i<text.length;i++){
      if(text[i] >="A" && text[i] <="Z" )
        cipherText+=this.KeyMatrix[text.charCodeAt(i)-65];
      else
        cipherText+=text[i];
    }
    return cipherText;
  }

  MonoalphabeticDecryption(Key:string,cipher:string):string{
    let plainText = "";
    this.UpdateKeyMatrix();
    for(let i=0;i<cipher.length;i++){
      let In = this.KeyMatrix.indexOf(cipher[i]);
      if(In!=-1){
        plainText+=String.fromCharCode(In+65);
      }
      else
        plainText+=cipher[i];
    }
    return plainText;
  }
}
