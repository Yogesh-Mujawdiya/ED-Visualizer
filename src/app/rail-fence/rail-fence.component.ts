import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RailFenceDecryptionComponent } from './rail-fence-decryption/rail-fence-decryption.component';
import { RailFenceEncryptionComponent } from './rail-fence-encryption/rail-fence-encryption.component';

export interface DialogData {
  Key   : string;
  Text  : string;
}

@Component({
  selector: 'app-rail-fence',
  templateUrl: './rail-fence.component.html',
  styleUrls: ['./rail-fence.component.css']
})
export class RailFenceComponent implements OnInit {

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
      const dialogRef = this.dialog.open(RailFenceEncryptionComponent, {
        width   : "98%",
        maxWidth: "800px",
        data: {Key: this.Key, Text: this.PlainText}
      });
    }
  }

  openDecryptionDialog(){
    if(this.Decryption()){
      const dialogRef = this.dialog.open(RailFenceDecryptionComponent, {
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
    this.CipherText = this.RailFenceEncryption(this.Key,this.PlainText);
    return true;
  }
  
  Decryption() : boolean{
    if(this.Key==null || this.Key==''){
      this.openSnackBar("Required Key For Decryption","Error");
      return false;
    }
    this.PlainText = this.RailFenceDecryption(this.Key,this.CipherText);
    return true;
  }
  
  RailFenceEncryption(Key:string,text:string):string{
    let cipherText = ""
    let key = parseInt(Key)
    this.TextMatrix = new Array(key);
    for(let i=0;i<key;i++){
      this.TextMatrix[i] = new Array(text.length);
      for(let j=0;j<text.length;j++)
        this.TextMatrix[i][j] = '\n'; 
    }
    let dir_down = false;
    let row = 0, col = 0;
    for(let i=0;i<text.length;i++){
      if(row == 0 || row == key-1)
        dir_down = !dir_down;
      this.TextMatrix[row][col++] = text[i];
      dir_down ? row++ : row -- ;
    }
    for(let i=0;i<key;i++)
      for(let j=0;j<text.length;j++)
        if(this.TextMatrix[i][j]!='\n')
          cipherText += this.TextMatrix[i][j];
    return cipherText;
  }

  RailFenceDecryption(Key:string,cipher:string):string{
    let plainText = "";
    let key = parseInt(Key);
    this.CipherMatrix = new Array(key);
    for(let i=0;i<key;i++){
      this.CipherMatrix[i] = new Array(cipher.length);
      for(let j=0;j<cipher.length;j++)
        this.CipherMatrix[i][j] = '\n';
    }
    let dir_down = false;
    let row=0, col=0;
    for(let i=0;i<cipher.length;i++){
      if(row==0)
        dir_down = true;
      if(row == key-1)
        dir_down = false;
      this.CipherMatrix[row][col++] = '*';
      dir_down ? row++ : row--;
    }
    let index = 0;
    for(let i=0;i<key;i++)
      for(let j=0;j<cipher.length;j++)
      if(this.CipherMatrix[i][j]=='*' && index<cipher.length)
        this.CipherMatrix[i][j] = cipher[index++];
    row = 0 , col = 0;
    for(let i=0;i<cipher.length;i++){
      if(row==0)
        dir_down = true;
      if(row == key-1)
        dir_down = false;
      if(this.CipherMatrix[row][col] != '*')
        plainText+=this.CipherMatrix[row][col++];
      dir_down ? row++ : row--;
    }
    return plainText;
  }



}
