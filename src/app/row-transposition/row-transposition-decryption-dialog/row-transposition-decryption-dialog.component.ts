import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { interval } from 'rxjs';
import { startWith, take, finalize } from 'rxjs/operators';

export interface DialogData {
  Key   : string;
  Text  : string;
  Matrix : any;
}

@Component({
  selector: 'app-row-transposition-decryption-dialog',
  templateUrl: './row-transposition-decryption-dialog.component.html',
  styleUrls: ['./row-transposition-decryption-dialog.component.css']
})
export class RowTranspositionDecryptionDialogComponent implements OnInit {

  Speed: string = "100";
  Key: string;
  CipherText: string;
  PlainText: string;
  Play: boolean;
  Matrix: any;
  KM: any;
  Col : number;
  Row : number;
  takeFourNumbers : any;
  takeFourNumber  : any;
  Running : any;
  Running1 : any;
  Running2 : any;
  prev: any;
  prevR1 : any;
  prevR2 : any;

  constructor(
    public dialogRef: MatDialogRef<RowTranspositionDecryptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.Key = data.Key;
      this.CipherText = data.Text;
      let col = this.Key.length;
      let row = Math.floor(this.CipherText.length/col);
      this.Matrix = data.Matrix;
      this.Matrix = new Array();
      for(let i=0;i<col;i++){
        this.Matrix[i] = new Array(row);
        for(let j=0;j<row;j++)
          this.Matrix[i][j] = data.Matrix[j][i];
      }
      this.KM = []
      for(let i=0;i<this.Key.length;i++)
        this.KM[i] = [this.Key[i], i+1];
      this.KM.sort();
      this.Col = col;
      this.Row = row;
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
    if (parseInt(this.Speed) > 9999)
      this.Speed = "9999";
    else if (parseInt(this.Speed) < 100 || this.Speed == '')
      this.Speed = "100";
  }
  
  PlayDecryption(){
    this.prev = null;
    this.prevR1 = null;
    this.prevR2 = null;
    let table = document.getElementById("RT");
    let rows = table.getElementsByTagName("tr");
    for(let i=0;i<rows.length;i++){
      let col = rows[i].getElementsByTagName("td");
      for(let j=1;j<col.length;j++){
        col[j].className = 'Normal';
      }
    }
    this.takeFourNumbers = interval(parseInt(this.Speed)*this.Col).pipe(
      startWith(0),
      take(this.Row),
      finalize(()=>{
        setTimeout( () => {   
          if(this.prev!=null)
            this.prev.className = 'DeActivate';
          if(this.prevR1 != null)
            this.prevR1.className = "CodeDeActivate";
          if(this.prevR2 != null)
            this.prevR2.className = "CodeDeActivate";
          this.Play = false;
        }, parseInt(this.Speed)*this.Row );
      })
    );
    this.takeFourNumber = interval(parseInt(this.Speed)).pipe(startWith(0), take(this.Col));
    if(this.Running != undefined)
      this.Running.unsubscribe();
    if(this.Running1 != undefined)
      this.Running1.unsubscribe();
    let rc = 0;
    this.Play=true;
    this.PlainText = "";
    let col = this.Matrix.length;
    let row = this.Matrix[0].length;
    this.Running  = this.takeFourNumbers.subscribe(x => {
      let cc= 0;
      let l = rc;
      rc+=1;
      this.Running1  =  this.takeFourNumber.subscribe(i => {
        i = cc;
        cc+=1;
        if(this.Matrix[this.KM[i][1]-1][l]!='_')
            this.PlainText += this.Matrix[this.KM[i][1]-1][l];
          let table = document.getElementById("RT");
          let rows = table.getElementsByTagName("tr");
          let cols = rows[this.KM[i][1]-1].getElementsByTagName("td")[l+3];
          rows[i].getElementsByTagName("td")[1].className = "CodeActivate";
          rows[this.KM[i][1]-1].getElementsByTagName("td")[2].className = "CodeActivate";
          cols.className = 'Activate';
          if(this.prev != null)
            this.prev.className = 'DeActivate'; 
          this.prev = cols;
          if(this.prevR1 != null)
            this.prevR1.className = "CodeDeActivate";
          if(this.prevR2 != null)
            this.prevR2.className = "CodeDeActivate";
          this.prevR1 = rows[this.KM[i][1]-1].getElementsByTagName("td")[2];
          this.prevR2 = rows[i].getElementsByTagName("td")[1];
      });
    });
  }
  ngOnInit(): void {

  }

}
