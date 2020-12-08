import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { interval } from 'rxjs';
import { startWith, take, finalize } from 'rxjs/operators';
import { DialogDataModule } from 'src/app/dialog-data/dialog-data.module';

@Component({
  selector: 'app-baconian-decryption',
  templateUrl: './baconian-decryption.component.html',
  styleUrls: ['./baconian-decryption.component.css']
})
export class BaconianDecryptionComponent implements OnInit {

  Speed: string = "100";
  Key: string;
  KeyMatrix: any;
  CipherText: string;
  PlainText: string;
  Play: boolean;
  Loop: any;
  Running: any;
  Prev: any;
  PlainTextMatrix: any[];
  InnerLoop: any;
  RunningInside: any;

  constructor(
    public dialogRef: MatDialogRef<BaconianDecryptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataModule) {
    this.Key = data.Key;
    this.PlainText = data.Text;
    this.KeyMatrix = {
      'AAAAA': 'A', 'AAAAB': 'B', 'AAABA': 'C', 'AAABB': 'D', 'AABAA': 'E',
      'AABAB': 'F', 'AABBA': 'G', 'AABBB': 'H', 'ABAAA': 'I', 'ABAAB': 'J',
      'ABABA': 'K', 'ABABB': 'L', 'ABBAA': 'M', 'ABBAB': 'N', 'ABBBA': 'O',
      'ABBBB': 'P', 'BAAAA': 'Q', 'BAAAB': 'R', 'BAABA': 'S', 'BAABB': 'T',
      'BABAA': 'U', 'BABAB': 'V', 'BABBA': 'W', 'BABBB': 'X', 'BBAAA': 'Y', 'BBAAB': 'Z'
    };
    this.CipherText = "";
    this.PlainTextMatrix = new Array(Math.floor(this.PlainText.length/5));
    for (let i = 0; i < this.PlainText.length; i+=5) {
      this.PlainTextMatrix[i] = new Array(3);
      this.PlainTextMatrix[i][0] = this.PlainText.slice(i,i+5);
      let K = this.KeyMatrix[this.PlainText.slice(i,i+5)];
      this.PlainTextMatrix[i][1] = this.PlainText.slice(i,i+5) + " : "+ K;
      this.PlainTextMatrix[i][2] = K;
    }
  }

  ngOnDestroy(): void {
    if (this.Running != undefined)
      this.Running.unsubscribe();
    if (this.RunningInside != undefined)
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
    this.Loop = interval(parseInt(this.Speed)*3).pipe(
      startWith(0),
      take(this.PlainTextMatrix.length)
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
        let Hcol = rows[0].getElementsByTagName("td");
        for(let l=0;l<Hcol.length;l++)
          Hcol[l].className = "Normal";
        if(this.Prev!=null)
          this.Prev.className = "DeActivate";
        let c = j ;
        if(c==0){
          col[c].className = 'CodeActivate';
        }
        else if(c==1){
          col[c].className = 'Activate';
          this.Prev = col[c];
        }
        else{
          col[c].className = 'Activate';
          this.CipherText+= this.PlainTextMatrix[r][c];
        }
        Hcol[c].className = "CodeDeActivate";
        j++;
      });
      i++;
    })
  }
  ngOnInit(): void {

  }

}

