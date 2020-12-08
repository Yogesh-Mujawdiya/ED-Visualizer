import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VigenereCipherDecryptionComponent } from './vigenere-cipher-decryption/vigenere-cipher-decryption.component';
import { VigenereCipherEncryptionComponent } from './vigenere-cipher-encryption/vigenere-cipher-encryption.component';

export interface DialogData {
  Key   : string;
  Text  : string;
}

@Component({
  selector: 'app-vigenere-cipher',
  templateUrl: './vigenere-cipher.component.html',
  styleUrls: ['./vigenere-cipher.component.css']
})
export class VigenereCipherComponent implements OnInit {
  Key:string;
  PlainText:string;
  CipherText:string;

  constructor(public dialog:MatDialog, private _snackBar: MatSnackBar) {
    this.Key = "YOGESH";
    this.PlainText = "VIGENERECIPHER";
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
      const dialogRef = this.dialog.open(VigenereCipherEncryptionComponent, {
        width   : "98%",
        maxWidth: "800px",
        data: {Key: this.Key, Text: this.PlainText}
      });
    }
  }

  openDecryptionDialog(){
    if(this.Decryption()){
      const dialogRef = this.dialog.open(VigenereCipherDecryptionComponent, {
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

  MonoalphabeticEncryption(Key:string,text:string):string{
    let cipherText = "";
    Key = Key.toUpperCase();
    for(let i=0;i<text.length;i++)
      cipherText+=String.fromCharCode((text.charCodeAt(i)-65+Key.charCodeAt(i%Key.length)-65)%26+65);
    return cipherText;
  }

  MonoalphabeticDecryption(Key:string,cipher:string):string{
    let plainText = "";
    Key = Key.toUpperCase();
    for(let i=0;i<cipher.length;i++){
      let x = (cipher.charCodeAt(i)-Key.charCodeAt(i%Key.length)+26)%26+65;
      plainText+=String.fromCharCode(x);
    }
    return plainText;
  }
}
