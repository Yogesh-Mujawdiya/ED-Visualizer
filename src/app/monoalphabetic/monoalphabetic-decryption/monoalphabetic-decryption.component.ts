import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { interval } from 'rxjs';
import { startWith, take, finalize } from 'rxjs/operators';
import { DialogData } from '../monoalphabetic.component';

@Component({
  selector: 'app-monoalphabetic-decryption',
  templateUrl: './monoalphabetic-decryption.component.html',
  styleUrls: ['./monoalphabetic-decryption.component.css']
})
export class MonoalphabeticDecryptionComponent implements OnInit {

 
  Speed: string = "100";
  Key: string;
  KeyMatrix: any[];
  CipherText: string;
  PlainText: string;
  Play: boolean;
  Loop : any;
  Running : any;
  Prev : any;
  CipherTextMatrix:any[];
  InnerLoop: any;
  RunningInside: any;

  constructor(
    public dialogRef: MatDialogRef<MonoalphabeticDecryptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.Key = data.Key;
      this.CipherText = data.Text;
      this.UpdateKeyMatrix();
      this.PlainText = "";
      this.CipherTextMatrix = new Array(this.CipherText.length);
      for(let i=0;i<this.CipherText.length;i++){
        this.CipherTextMatrix[i] = new Array(3);
        for(let j=0;j<3;j++)
          this.CipherTextMatrix[i][j] = '';
        this.CipherTextMatrix[i][0] = this.CipherText[i]; 
      }
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
  
  
  ngOnDestroy(): void {
    if(this.Running != undefined)
        this.Running.unsubscribe();
    if(this.RunningInside != undefined)
        this.RunningInside.unsubscribe();
  }

  validateValue() {
    if (parseInt(this.Speed) > 9999)
      this.Speed = "9999";
    else if (parseInt(this.Speed) < 100 || this.Speed == '')
      this.Speed = "100";
  }
  
  PlayEncryption(){
    for(let i=0;i<this.CipherText.length;i++){
      for(let j=0;j<3;j++)
        this.CipherTextMatrix[i][j] = '';
      this.CipherTextMatrix[i][0] = this.CipherText[i]; 
    }
    this.Prev = null;
    this.PlainText = "";
    let table = document.getElementById("Visualizer");
    let rows = table.getElementsByTagName("tr");
    for(let i=0;i<rows.length;i++){
      let col = rows[i].getElementsByTagName("td");
      for(let j=0;j<col.length;j++){
        col[j].className = 'Normal';
      }
    }
    let Keytable = document.getElementById("KeyTabel");
    let Keyrows = Keytable.getElementsByTagName("tr");
    for(let i=0;i<Keyrows.length;i++){
      let Keycol = Keyrows[i].getElementsByTagName("td");
      for(let j=0;j<Keycol.length;j++){
        Keycol[j].className = 'Normal';
      }
    }
    this.Loop = interval(parseInt(this.Speed)*5).pipe(
      startWith(0),
      take(this.CipherText.length)
    );
    this.InnerLoop = interval(parseInt(this.Speed)).pipe(
      startWith(0),
      take(3),
      finalize(()=>{
        if(this.Prev!=null)
          this.Prev.className = "DeActivate";
      })
    );
    if(this.Running != undefined)
      this.Running.unsubscribe();
    if(this.RunningInside != undefined)
        this.RunningInside.unsubscribe();
    let i = 1; 
    this.Running = this.Loop.subscribe(x=>{
      let j=0;
      let r = i-1;
      let col = rows[i].getElementsByTagName("td");
      this.RunningInside = this.InnerLoop.subscribe(y=>{
        if(this.Prev!=null)
          this.Prev.className = "DeActivate";
        let c = j ;
        if(c==0){
          col[c].className = 'CodeActivate';
        }
        else if(c==1){
          this.CipherTextMatrix[r][c] = this.KeyMatrix.indexOf(this.CipherText[r]);
          let Keycol = Keyrows[0].getElementsByTagName("td");
          Keycol[this.CipherTextMatrix[r][c]].className = 'Activate';
          this.Prev = Keycol[this.CipherTextMatrix[r][c]];
          col[c].className = 'Activate';
        }
        else if(c==2){
          if(this.CipherTextMatrix[r][1] != -1){
            this.CipherTextMatrix[r][c] = String.fromCharCode(this.CipherTextMatrix[r][1]+65);
          }
          else
            this.CipherTextMatrix[r][c] = this.CipherText[r];
          col[c].className = 'Activate';
          this.PlainText+= this.CipherTextMatrix[r][c];
        }
        j++;
      })  
      i++;
    })
  }
  ngOnInit(): void {

  }

}
