import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { interval } from 'rxjs';
import { finalize, startWith, take } from 'rxjs/operators';

export interface DialogData {
  Key   : string;
  Text  : string;
}

@Component({
  selector: 'app-row-transposition-encryption-dialog',
  templateUrl: './row-transposition-encryption-dialog.component.html',
  styleUrls: ['./row-transposition-encryption-dialog.component.css']
})
export class RowTranspositionEncryptionDialogComponent implements OnDestroy{

  prev: any;
  Speed : string = "100";
  SpeedValue : number;
  Key: string;
  CipherText: string;
  PlainText: string;
  Play: boolean;
  Matrix: any;
  KM: any[];
  Col : number;
  Row : number;
  takeFourNumbers : any;
  takeFourNumber  : any;
  Running : any;
  Running1 : any;
  Running2 : any;

  constructor(
    public dialogRef: MatDialogRef<RowTranspositionEncryptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.Key = this.data.Key;
      this.PlainText = this.data.Text;
      this.KM = []
      for(let i=0;i<this.Key.length;i++)
        this.KM[i] = [this.Key[i], i+1];
      this.KM.sort();
      this.Col = this.Key.length;
      this.Row = Math.floor(this.PlainText.length/this.Col);
      if(this.PlainText.length%this.Col)
        this.Row+=1;
      this.Matrix = new Array(this.Row);
      for (let i=0,k=0; i < this.Row; i++)
      { 
        this.Matrix[i] = new Array(this.Col);
        for (let j=0; j<this.Col; j++)
          if(k==this.PlainText.length) 
            this.Matrix[i][j] = '_';      
          else
            this.Matrix[i][j] = this.PlainText[k++];
      }
      this.Running2 = interval(100).pipe().subscribe(()=>{
        (<HTMLInputElement> document.getElementById("Speed")).value=this.Speed;
      });
  }

  ngOnDestroy(): void {
    if(this.Running != undefined)
        this.Running.unsubscribe();
    if(this.Running1 != undefined)
      this.Running1.unsubscribe();
    if(this.Running2 != undefined)
      this.Running2.unsubscribe();
  }

  validateValue() {
    if (parseInt(this.Speed) > 10000)
      this.Speed = "10000";
    else if (parseInt(this.Speed) < 100 || this.Speed == '')
      this.Speed = "100";
  }

  PlayEncryptionMethod(){
    this.prev = null;
    let table = document.getElementById("RT");
    let rows = table.getElementsByTagName("tr");
    for(let i=1;i<rows.length;i++){
      let col = rows[i].getElementsByTagName("td");
      for(let j=0;j<col.length;j++){
        col[j].className = 'Normal';
      }
    }
    this.takeFourNumbers = interval(parseInt(this.Speed)*this.Row).pipe(
      startWith(0),
      take(this.Key.length),
      finalize(()=>{
        setTimeout( () => {   
          if(this.prev!=null)
            this.prev.className = 'DeActivate';
        }, parseInt(this.Speed)*this.Row );
      })
    );
    this.takeFourNumber = interval(parseInt(this.Speed)).pipe(startWith(0), take(this.Row));
    this.CipherText = "";
    let keyMap=[];
    for(let i=0; i < this.Key.length; i++) 
        keyMap[i] = [this.Key[i],i];
    keyMap.sort();
    keyMap.reverse();
    if(this.Running != undefined)
      this.Running.unsubscribe();
    if(this.Running1 != undefined)
      this.Running1.unsubscribe();
    let rc = 0;
    this.Running  = this.takeFourNumbers.subscribe(x => {
      x=rc;
      rc+=1;
      let j=keyMap.pop()[1];
      let cc=0;
      this.Running1  =  this.takeFourNumber.subscribe(i => {
        i = cc;
        cc+=1;
        this.CipherText += this.Matrix[i][j];
        let table = document.getElementById("RT");
        let rows = table.getElementsByTagName("tr");
        let col = rows[i+2].getElementsByTagName("td");
        rows[1].getElementsByTagName("td")[j].className = 'CodeActivate';
        col[j].className = 'Activate';
        if(x==this.Key.length-1 && i==this.Row-1){
          this.Play = false;
        }
        if(this.prev!=null)
          this.prev.className = 'DeActivate';
        this.prev = col[j];
        if(i==this.Row-1)
          rows[1].getElementsByTagName("td")[j].className = 'CodeDeActivate';
      });
    });
  }
}
