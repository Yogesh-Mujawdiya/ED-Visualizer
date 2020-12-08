import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SimpleCipherDecryptionComponent } from './simple-cipher-decryption/simple-cipher-decryption.component';
import { SimpleCipherEncryptionComponent } from './simple-cipher-encryption/simple-cipher-encryption.component';

export interface DialogData {
  Key   : string;
  Text  : string;
}

@Component({
  selector: 'app-simple-cipher',
  templateUrl: './simple-cipher.component.html',
  styleUrls: ['./simple-cipher.component.css']
})
export class SimpleCipherComponent implements OnInit {

  Key:string;
  CipherMatrix:any[];
  TextMatrix:any[];
  PlainText:string;
  CipherText:string;

  constructor(public dialog:MatDialog, private _snackBar: MatSnackBar) {
    this.Key = "3";
    this.PlainText = "GeeksforGeeks";
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
      const dialogRef = this.dialog.open(SimpleCipherEncryptionComponent, {
        width   : "98%",
        maxWidth: "800px",
        data: {Key: this.Key, Text: this.PlainText}
      });
    }
  }

  openDecryptionDialog(){
    if(this.Decryption()){
      const dialogRef = this.dialog.open(SimpleCipherDecryptionComponent, {
        width: '98%',
        maxWidth: '800px',
        data: {Key: this.Key, Text: this.CipherText}
      });
    }
  }

  Encryption() : boolean{
    if(this.Key==null || this.Key==''){
      this.openSnackBar("Required Key For Encryption","Error");
      return false;
    }
    this.CipherText = this.SimpleCipherEncryption(this.Key,this.PlainText);
    return true;
  }
  
  Decryption() : boolean{
    if(this.Key==null || this.Key==''){
      this.openSnackBar("Required Key For Decryption","Error");
      return false;
    }
    this.PlainText = this.SimpleCipherDecryption(this.Key,this.CipherText);
    return true;
  }
  
  SimpleCipherEncryption(Key:string,text:string):string{
    let cipherText = ""
    let key = parseInt(Key)
    for(let i=0;i<text.length;i++)
      cipherText+=String.fromCharCode(text.charCodeAt(i)+key);
    return cipherText;
  }

  SimpleCipherDecryption(Key:string,cipher:string):string{
    let plainText = "";
    let key = parseInt(Key);
    for(let i=0;i<cipher.length;i++)
    plainText+=String.fromCharCode(cipher.charCodeAt(i)-key);
    return plainText;
  }
}
