import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { interval } from 'rxjs';
import { startWith, take, finalize } from 'rxjs/operators';
import { DialogData } from '../simple-cipher.component';

@Component({
  selector: 'app-simple-cipher-encryption',
  templateUrl: './simple-cipher-encryption.component.html',
  styleUrls: ['./simple-cipher-encryption.component.css']
})
export class SimpleCipherEncryptionComponent implements OnInit {

  Speed: string = "100";
  Key: number;
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
    public dialogRef: MatDialogRef<SimpleCipherEncryptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.Key = parseInt(data.Key);
      this.PlainText = data.Text;
      this.CipherText = "";
      this.PlainTextMatrix = new Array(this.PlainText.length);
      for(let i=0;i<this.PlainText.length;i++){
        this.PlainTextMatrix[i] = new Array(5);
        for(let j=0;j<5;j++)
          this.PlainTextMatrix[i][j] = '';
        this.PlainTextMatrix[i][0] = this.PlainText[i]; 
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
      for(let j=0;j<5;j++)
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
    this.Loop = interval(parseInt(this.Speed)*5).pipe(
      startWith(0),
      take(this.PlainText.length)
    );
    this.InnerLoop = interval(parseInt(this.Speed)).pipe(
      startWith(0),
      take(5)
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
        let c = j ;
        if(c==0){
          col[c].className = 'CodeActivate';
        }
        else if(c==1){
          this.PlainTextMatrix[r][c] = this.PlainText.charCodeAt(r);
          col[c].className = 'Activate';
        }
        else if(c==2){
          this.PlainTextMatrix[r][c] = this.Key;
          col[c].className = 'Activate';
        }
        else if(c==3){
          this.PlainTextMatrix[r][c] = this.PlainTextMatrix[r][1]+this.PlainTextMatrix[r][2];
          col[c].className = 'Activate';
        }
        else if(c==4){
          this.PlainTextMatrix[r][c] = String.fromCharCode(this.PlainTextMatrix[r][3]);
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
