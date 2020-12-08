import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PolygramSubstituitonDecryptionComponent } from './polygram-substituiton-decryption/polygram-substituiton-decryption.component';
import { PolygramSubstituitonEncryptionComponent } from './polygram-substituiton-encryption/polygram-substituiton-encryption.component';

@Component({
  selector: 'app-polygram-substituiton',
  templateUrl: './polygram-substituiton.component.html',
  styleUrls: ['./polygram-substituiton.component.css']
})
export class PolygramSubstituitonComponent implements OnInit {

  PlainText:string;
  CipherText:string;
  EncryptionPanelState:boolean;
  DecryptionPanelState:boolean;
  PlayEncryption:boolean;
  PlayDecryption:boolean;
  cipherText:string;
  plainText:string;
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
  DPolygram_Cipher_ASCII:number[];
  DPolygram_Binary:string[];
  DPolygram_LSB:string[];
  DPolygram_Sub_Key:number[];
  DPolygram_ASCII:number[];
  DPolygram_Char:string[];
  DPolygram_Text:string[];
  reverse: string;
  text: string;
  

  constructor(public dialog:MatDialog,
    private _snackBar: MatSnackBar) {
      // this.PlainText = "RowTransposition";
    this.CipherText = "©¥£¢¨¢£±";
    this.Decryption();
  }

  ngOnInit(): void {

  }


  openEncryptionDialog(){
    if(this.Encryption()){
      const dialogRef = this.dialog.open(PolygramSubstituitonEncryptionComponent, {
        width   : "98%",
        maxWidth: "800px",
        data: {Key1: this.Key1,Key2: this.Key2,Key3: this.Key3, Text: this.PlainText}
      });
    }
  }

  openDecryptionDialog(){
    if(this.Decryption()){
      const dialogRef = this.dialog.open(PolygramSubstituitonDecryptionComponent, {
        width: '98%',
        maxWidth: '800px',
        data: {Key1: this.Key1,Key2: this.Key2,Key3: this.Key3, Text: this.CipherText}
      });
    }
  }


  Encryption() : boolean{
    if(
      (this.Key1==null || this.Key1=='') &&
      (this.Key2==null || this.Key2=='') &&
      (this.Key3==null || this.Key3=='')
    ){
      this.openSnackBar("Required All Key For Encryption","Error");
      return false;
    }
    this.CipherText="";
    let K = [this.Key1.charCodeAt(0), this.Key2.charCodeAt(0), this.Key3.charCodeAt(0)]
    for(let i=this.PlainText.length-1,j=0;i>=0;i--,j++){
      let B = (this.PlainText.charCodeAt(i)+K[j%3]).toString(2);
      let Alt_LSB = B.slice(0,B.length-1)+(B[B.length-1]=='0' ? '1' : '0');
      this.CipherText+=String.fromCharCode((parseInt(Alt_LSB,2)));
    }
    return true;
  }

  Decryption() : boolean{
    if(
      (this.Key1==null || this.Key1=='') &&
      (this.Key2==null || this.Key2=='') &&
      (this.Key3==null || this.Key3=='')
    ){
      this.openSnackBar("Required All Key For Encryption","Error");
      return false;
    }
    this.PlainText = "";
    let K = [this.Key1.charCodeAt(0), this.Key2.charCodeAt(0), this.Key3.charCodeAt(0)];
    for(let i=0,j=0;i<this.CipherText.length;i++,j++){
      let B = this.CipherText.charCodeAt(i).toString(2);
      let Alt_LSB = B.slice(0,B.length-1)+(B[B.length-1]=='0' ? '1' : '0');
      this.PlainText=String.fromCharCode(parseInt(Alt_LSB,2)-K[j%3])+this.PlainText;
    }
    return true;
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
