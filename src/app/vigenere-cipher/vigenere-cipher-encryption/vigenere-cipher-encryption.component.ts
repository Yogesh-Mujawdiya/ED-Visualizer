import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { interval } from 'rxjs';
import { startWith, take, finalize } from 'rxjs/operators';
import { DialogData } from '../vigenere-cipher.component';

@Component({
  selector: 'app-vigenere-cipher-encryption',
  templateUrl: './vigenere-cipher-encryption.component.html',
  styleUrls: ['./vigenere-cipher-encryption.component.css']
})
export class VigenereCipherEncryptionComponent implements OnInit {

  Speed: string = "100";
  Key: string;
  KeyMatrix: any[];
  CipherText: string;
  PlainText: string;
  Play: boolean;
  Loop : any;
  Running : any;
  Prev : any;
  PlainTextMatrix:any[];
  InnerLoop: any;
  RunningInside: any;

  constructor(
    public dialogRef: MatDialogRef<VigenereCipherEncryptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.Key = data.Key;
      this.PlainText = data.Text;
      this.CipherText = "";
      this.PlainTextMatrix = new Array(this.PlainText.length);
      for(let i=0;i<this.PlainText.length;i++){
        this.PlainTextMatrix[i] = new Array(6);
        this.PlainTextMatrix[i][0] = this.PlainText[i]; 
        if(this.PlainText[i]>="A" && this.PlainText[i]<="Z"){
          this.PlainTextMatrix[i][2] = this.PlainText.charCodeAt(i)-65; 
          this.PlainTextMatrix[i][1] = this.Key[i%this.Key.length]; 
          this.PlainTextMatrix[i][3] = this.Key.charCodeAt(i%this.Key.length)-65; 
          this.PlainTextMatrix[i][4] = (this.PlainTextMatrix[i][2]+this.PlainTextMatrix[i][3])%26;
          this.PlainTextMatrix[i][5] = String.fromCharCode(this.PlainTextMatrix[i][4]+65);
        }
        else{
          this.PlainTextMatrix[i][2] = "Out Of Range"
          this.PlainTextMatrix[i][1] = this.Key[i%this.Key.length]; 
          this.PlainTextMatrix[i][3] = this.Key.charCodeAt(i%this.Key.length); 
          this.PlainTextMatrix[i][4] = "Out Of Range";
          this.PlainTextMatrix[i][5] = this.PlainText[i];
        }
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
    this.Prev = null;
    this.CipherText = "";
    let table = document.getElementById("Visualizer");
    let rows = table.getElementsByTagName("tr");
    for(let i=0;i<rows.length;i++){
      let col = rows[i].getElementsByTagName("td");
      for(let j=0;j<col.length;j++){
        col[j].className = 'Normal';
      }
    }
    this.Loop = interval(parseInt(this.Speed)*6).pipe(
      startWith(0),
      take(this.PlainText.length)
    );
    this.InnerLoop = interval(parseInt(this.Speed)).pipe(
      startWith(0),
      take(6),
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
        let Hcol = rows[0].getElementsByTagName("td");
        for(let l=0;l<Hcol.length;l++)
          Hcol[l].className = "Normal";
        if(this.Prev!=null)
          this.Prev.className = "DeActivate";
        let c = j ;
        if(c==0){
          col[c].className = 'CodeActivate';
        }
        else if(c>0 && c<5){
          col[c].className = 'Activate';
          this.Prev = col[c];
        }
        else{
          col[c].className = 'Activate';
          this.CipherText+= this.PlainTextMatrix[r][c];
        }
        Hcol[c].className = "CodeDeActivate";
        j++;
      })  
      i++;
    })
  }
  ngOnInit(): void {

  }

}

