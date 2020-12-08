import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { interval } from 'rxjs';
import { startWith, take } from 'rxjs/operators';
import { DialogData } from '../simple-cipher.component';

@Component({
  selector: 'app-simple-cipher-decryption',
  templateUrl: './simple-cipher-decryption.component.html',
  styleUrls: ['./simple-cipher-decryption.component.css']
})
export class SimpleCipherDecryptionComponent implements OnInit {

  Speed: string = "100";
  Key: number;
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
    public dialogRef: MatDialogRef<SimpleCipherDecryptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.Key = parseInt(data.Key);
      this.CipherText = data.Text;
      this.PlainText = "";
      this.CipherTextMatrix = new Array(this.CipherText.length);
      for(let i=0;i<this.CipherText.length;i++){
        this.CipherTextMatrix[i] = new Array(5);
        for(let j=0;j<5;j++)
          this.CipherTextMatrix[i][j] = '';
        this.CipherTextMatrix[i][0] = this.CipherText[i]; 
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
      for(let j=0;j<5;j++)
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
    this.Loop = interval(parseInt(this.Speed)*5).pipe(
      startWith(0),
      take(this.CipherText.length)
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
          this.CipherTextMatrix[r][c] = this.CipherText.charCodeAt(r);
          col[c].className = 'Activate';
        }
        else if(c==2){
          this.CipherTextMatrix[r][c] = this.Key;
          col[c].className = 'Activate';
        }
        else if(c==3){
          this.CipherTextMatrix[r][c] = this.CipherTextMatrix[r][1]-this.CipherTextMatrix[r][2];
          col[c].className = 'Activate';
        }
        else if(c==4){
          this.CipherTextMatrix[r][c] = String.fromCharCode(this.CipherTextMatrix[r][3]);
          col[c].className = 'Activate';
          this.PlainText += this.CipherTextMatrix[r][c];
        }
        j++;
      })  
      i++;
    })
  }
  ngOnInit(): void {

  }

}
