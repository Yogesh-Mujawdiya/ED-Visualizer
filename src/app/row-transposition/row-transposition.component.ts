import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RowTranspositionDecryptionDialogComponent } from './row-transposition-decryption-dialog/row-transposition-decryption-dialog.component';
import { RowTranspositionEncryptionDialogComponent } from './row-transposition-encryption-dialog/row-transposition-encryption-dialog.component';

@Component({
  selector: 'app-row-transposition',
  templateUrl: './row-transposition.component.html',
  styleUrls: ['./row-transposition.component.css']
})

export class RowTranspositionComponent implements OnInit {

  Key:string;
  PlainText:string;
  CipherText:string;
  PlainTextMatrix:any;
  CipherTextMatrix:any;

  constructor(public dialog:MatDialog, private _snackBar: MatSnackBar) {
    this.Key = "HELLO";
    this.PlainText = "RowTransposition";
    this.CipherText = "oni_Rasnwst_Tpi_roo_";
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
      const dialogRef = this.dialog.open(RowTranspositionEncryptionDialogComponent, {
        width   : "98%",
        maxWidth: "800px",
        data: {Key: this.Key, Text: this.PlainText}
      });
    }
  }

  openDecryptionDialog(){
    if(this.Decryption()){
      const dialogRef = this.dialog.open(RowTranspositionDecryptionDialogComponent, {
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
    this.CipherText = this.RowTranspositionEncryption(this.Key,this.PlainText);
    return true;
  }
  
  Decryption() : boolean{
    if(this.Key==null || this.Key==''){
      this.openSnackBar("Required Key For Decryption","Error");
      return false;
    }
    this.PlainText = this.RowTranspositionDecryption(this.Key,this.CipherText);
    return true;
  }
  

  RowTranspositionEncryption(key:string,msg:string):string{
    let cipher = "";
    let col = key.length;
    let row = Math.floor(msg.length/col);
    if(msg.length%col)
      row+=1;
    this.PlainTextMatrix = new Array(row);
    for (let i=0,k=0; i < row; i++)
    { 
      this.PlainTextMatrix[i] = new Array(col);
      for (let j=0; j<col; j++)
        if(k==msg.length) 
          this.PlainTextMatrix[i][j] = '_';      
        else
          this.PlainTextMatrix[i][j] = msg[k++];
    }
    let keyMap = [];
    for(let k=0; k < key.length;k++)
      keyMap[k] = [key[k], k];
    keyMap.sort();
    keyMap.reverse();

    for(let k=0; k < key.length;k++) 
    { 
        let j=keyMap.pop()[1];
        for (let i=0; i<row; i++)
          cipher += this.PlainTextMatrix[i][j];
    }
    return cipher; 
  }

  RowTranspositionDecryption(key:string,cipher:string):string{
    let msg = "";
    let col = key.length;
    let row = Math.floor(cipher.length/col);
    let matrix = new Array(row);
    this.CipherTextMatrix = new Array(row);
    for(let i=0;i<row;i++){
      matrix[i] = new Array(col);
      this.CipherTextMatrix[i] = new Array(col);
    }
    for (let j=0,k=0; j < col; j++) 
      for (let i=0; i<row; i++ )
        matrix[i][j] = cipher[k++];
    let keyMap = [];
    for(let l=0; l<col;l++) {
      keyMap[l] = [key[l], l];
    }
    keyMap.sort();
    keyMap.reverse();
    for(let l=0; l<col;l++) 
    { 
        let j=keyMap.pop()[1];
        for (let i=0; i<row; i++) 
          this.CipherTextMatrix[i][j]=matrix[i][l];
    }
    for (let i=0; i<row; i++) 
      for(let j=0; j<col; j++)  
        if(this.CipherTextMatrix[i][j] != '_') 
          msg += this.CipherTextMatrix[i][j];
    this.CipherTextMatrix = matrix;
    return msg; 
  }


}
