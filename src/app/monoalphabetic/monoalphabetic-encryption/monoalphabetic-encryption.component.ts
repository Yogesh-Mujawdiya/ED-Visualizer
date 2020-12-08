import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { interval } from 'rxjs';
import { finalize, startWith, take } from 'rxjs/operators';
import { DialogData } from '../monoalphabetic.component';

@Component({
  selector: 'app-monoalphabetic-encryption',
  templateUrl: './monoalphabetic-encryption.component.html',
  styleUrls: ['./monoalphabetic-encryption.component.css']
})
export class MonoalphabeticEncryptionComponent implements OnInit {

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
    public dialogRef: MatDialogRef<MonoalphabeticEncryptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.Key = data.Key;
      this.PlainText = data.Text;
      this.UpdateKeyMatrix();
      this.CipherText = "";
      this.PlainTextMatrix = new Array(this.PlainText.length);
      for(let i=0;i<this.PlainText.length;i++){
        this.PlainTextMatrix[i] = new Array(3);
        for(let j=0;j<3;j++)
          this.PlainTextMatrix[i][j] = '';
        this.PlainTextMatrix[i][0] = this.PlainText[i]; 
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
    for(let i=0;i<this.PlainText.length;i++){
      for(let j=0;j<3;j++)
        this.PlainTextMatrix[i][j] = '';
      this.PlainTextMatrix[i][0] = this.PlainText[i]; 
    }
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
      take(this.PlainText.length)
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
          if(this.PlainText[r]>="A" && this.PlainText[r]<="Z")
            this.PlainTextMatrix[r][c] = this.PlainText.charCodeAt(r)-65;
          else
            this.PlainTextMatrix[r][c] = "Out of Range";
          col[c].className = 'Activate';
        }
        else if(c==2){
          if(this.PlainTextMatrix[r][1] != "Out of Range"){
            this.PlainTextMatrix[r][c] = this.KeyMatrix[this.PlainTextMatrix[r][1]];
            let Keycol = Keyrows[0].getElementsByTagName("td");
            Keycol[this.PlainTextMatrix[r][1]].className = 'Activate';
            this.Prev = Keycol[this.PlainTextMatrix[r][1]];
          }
          else
            this.PlainTextMatrix[r][c] = this.PlainText[r];
          col[c].className = 'Activate';
          this.CipherText+= this.PlainTextMatrix[r][c];
        }
        j++;
      })  
      i++;
    })
  }
  ngOnInit(): void {

  }

}
