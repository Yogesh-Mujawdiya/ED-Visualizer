import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { XOrCipherDecryptionComponent } from './x-or-cipher-decryption/x-or-cipher-decryption.component';
import { XOrCipherEncryptionComponent } from './x-or-cipher-encryption/x-or-cipher-encryption.component';

@Component({
  selector: 'app-x-or-cipher',
  templateUrl: './x-or-cipher.component.html',
  styleUrls: ['./x-or-cipher.component.css']
})
export class XOrCipherComponent implements OnInit {
  Key:string;
  PlainText:string;
  CipherText:string;

  constructor(public dialog:MatDialog, private _snackBar: MatSnackBar) {
    this.Key = "1";
    this.PlainText = "YogeshKumar";
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
      const dialogRef = this.dialog.open(XOrCipherEncryptionComponent, {
        width   : "98%",
        maxWidth: "800px",
        data: {Key: this.Key, Text: this.PlainText}
      });
    }
  }

  openDecryptionDialog(){
    if(this.Decryption()){
      const dialogRef = this.dialog.open(XOrCipherDecryptionComponent, {
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
    this.CipherText = this.XOrCipherEncryption(this.Key,this.PlainText);
    return true;
  }
  
  Decryption() : boolean{
    this.CipherText = this.CipherText.toUpperCase();
    if(this.Key==null || this.Key==''){
      this.openSnackBar("Required Key For Decryption","Error");
      return false;
    }
    this.PlainText = this.XOrCipherDecryption(this.Key,this.CipherText);
    return true;
  }

  XOrCipherEncryption(Key:string,text:string):string{
    let cipherText = "";
    for(let i=0;i<text.length;i++)
      cipherText+=String.fromCharCode(text.charCodeAt(i)^Key.charCodeAt(0))
    return cipherText;
  }

  XOrCipherDecryption(Key:string,cipher:string):string{
    let plainText = "";
    for(let i=0;i<cipher.length;i++)
      plainText+=String.fromCharCode(cipher.charCodeAt(i)^Key.charCodeAt(0))
    return plainText;
  }
}
