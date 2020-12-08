import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { interval } from 'rxjs';
import { startWith, take, finalize } from 'rxjs/operators';
import { DialogData } from '../rail-fence.component';

@Component({
  selector: 'app-rail-fence-encryption',
  templateUrl: './rail-fence-encryption.component.html',
  styleUrls: ['./rail-fence-encryption.component.css']
})
export class RailFenceEncryptionComponent implements OnInit {

 
  Speed: string = "100";
  Key: number;
  CipherText: string;
  PlainText: string;
  Play: boolean;
  Loop : any;
  Running : any;
  Prev : any;
  PlainTextMatrix:any[];

  constructor(
    public dialogRef: MatDialogRef<RailFenceEncryptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.Key = parseInt(data.Key);
      this.PlainText = data.Text;
      this.CipherText = "";
      this.PlainTextMatrix = new Array(this.Key);
      for(let i=0;i<this.Key;i++){
        this.PlainTextMatrix[i] = new Array(this.PlainText.length);
        for(let j=0;j<this.PlainText.length;j++)
          this.PlainTextMatrix[i][j] = ''; 
      }
      let dir_down = false;
      let row = 0, col = 0;
      for(let i=0;i<this.PlainText.length;i++){
        if(row == 0 || row == this.Key-1)
          dir_down = !dir_down;
        this.PlainTextMatrix[row][col++] = this.PlainText[i];
        dir_down ? row++ : row -- ;
      }
  }

  
  
  ngOnDestroy(): void {
    if(this.Running != undefined)
        this.Running.unsubscribe();
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
    this.Loop = interval(parseInt(this.Speed)).pipe(
      startWith(0),
      take(this.Key*this.PlainText.length),
      finalize(()=>{
        setTimeout( () => {
          if(this.Prev!=null){
            if(this.Prev.innerHTML != '')
              this.Prev.className = 'CodeActivate';
            else
              this.Prev.className = 'DeActivate';
            this.CipherText+=this.Prev.innerHTML;
          }
          this.Prev = null;
        })
      })
    );
    if(this.Running != undefined)
      this.Running.unsubscribe();
    let index = 0; 
    this.Running = this.Loop.subscribe(x=>{
      let i = Math.floor(index/this.PlainText.length);
      let j = index%this.PlainText.length;
      let table = document.getElementById("Visualizer");
      let rows = table.getElementsByTagName("tr");
      let col = rows[i].getElementsByTagName("td");
      col[j].className = 'Activate';
      if(this.Prev!=null){
        if(this.Prev.innerHTML != '')
          this.Prev.className = 'CodeActivate';
        else
          this.Prev.className = 'DeActivate';
        this.CipherText+=this.Prev.innerHTML;
      }
      this.Prev = col[j];
      index++;
    })
  }
  ngOnInit(): void {

  }

}
