import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { interval } from 'rxjs';
import { startWith, take, finalize } from 'rxjs/operators';
import { DialogData } from 'src/app/playfair/playfair.component';

@Component({
  selector: 'app-playfair-encryption',
  templateUrl: './playfair-encryption.component.html',
  styleUrls: ['./playfair-encryption.component.css']
})
export class PlayfairEncryptionComponent implements OnInit {

  Speed: string = "100";
  Key: string;
  CipherText: string;
  PlainText: string;
  Play: boolean;
  takeFourNumbers : any;
  takeFourNumber  : any;
  Running : any;
  Running1 : any;
  KeyMatrix: any[];
  PlainTextMatrix:string[];

  constructor(
    public dialogRef: MatDialogRef<PlayfairEncryptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.Key = data.Key;
      this.PlainText = data.Text;
      this.CipherText = "";
      let msg = this.PlainText.toUpperCase();
      let M = msg[0]
      for(let i=1;i<msg.length;i++){
        if(msg[i] == msg[i-1])
          M+="X";
        M+=msg[i];
      }
      msg = M;
      if(msg.length%2!=0)
        msg+="X";
      this.PlainTextMatrix = [];
      for(let i=0;i<msg.length;i+=2)
        this.PlainTextMatrix.push(msg[i]+msg[i+1]);
      this.updateKeyMatrix();
  }

  
  updateKeyMatrix(){
    let K = []
    for(let i of this.Key)
      if(!K.includes(i))
        K.push(i)
    this.KeyMatrix = new Array(5);
    for(let i=0;i<5;i++)
      this.KeyMatrix[i] = new Array(5);
    let c = 'A';
    let l = 0;
    for(let i=0;i<5;i++){
      for(let j=0;j<5;j++){
        if(l<K.length)
          this.KeyMatrix[i][j] = K[l++]
        else{
          while(this.Key.includes(c))
            c=String.fromCharCode(c.charCodeAt(0)+1);
          if(c=='J')
            c=String.fromCharCode(c.charCodeAt(0)+1);
          this.KeyMatrix[i][j] = c;
          c=String.fromCharCode(c.charCodeAt(0)+1);
        }
        if(this.KeyMatrix[i][j]=='I')
          this.KeyMatrix[i][j] = 'I/J'
      }
    }
    console.log(this.KeyMatrix);
  }

  
  ngOnDestroy(): void {
    if(this.Running != undefined)
        this.Running.unsubscribe();
    if(this.Running1 != undefined)
      this.Running1.unsubscribe();
  }

  validateValue() {
    if (parseInt(this.Speed) > 9999)
      this.Speed = "9999";
    else if (parseInt(this.Speed) < 100 || this.Speed == '')
      this.Speed = "100";
  }
  
  PlayEncryption(){
    this.CipherText = "";
    let table = document.getElementById("Visualizer");
    let rows = table.getElementsByTagName("tr");
    for(let i=0;i<rows.length;i++){
      let col = rows[i].getElementsByTagName("td");
      for(let j=0;j<col.length;j++){
        col[j].className = 'Normal';
      }
    }
    let X = document.getElementById("TextMatrix");
    let Y = X.getElementsByTagName("tr");
    for(let i=0;i<Y.length;i++){
      let col = Y[i].getElementsByTagName("td");
      for(let j=0;j<col.length;j++){
        col[j].className = 'Normal';
      }
    }
    this.takeFourNumbers = interval(parseInt(this.Speed)*6).pipe(
      startWith(0),
      take(this.PlainTextMatrix.length),
      finalize(()=>{
        setTimeout( () => {   
          this.Play = false;
        }, parseInt(this.Speed)*this.PlainTextMatrix.length);
      })
    );
    this.takeFourNumber = interval(parseInt(this.Speed)).pipe(startWith(0), take(6));
    if(this.Running != undefined)
      this.Running.unsubscribe();
    if(this.Running1 != undefined)
      this.Running1.unsubscribe();
    let rc = 0;
    this.Play=true;
    this.Running  = this.takeFourNumbers.subscribe(x => {
      x = rc;
      rc+=1;
      let cc = 0;
      let T = document.getElementById("TextMatrix");
      let C = T.getElementsByTagName("tr")[0].getElementsByTagName("td")[x];
      C.className = "CodeActivate"
      let x1, x2, y1, y2, a, b;
      a = this.PlainTextMatrix[x][0];
      b = this.PlainTextMatrix[x][1];
      if(a=='J' || a=='I')
        a = 'I/J'
      if(b=='J' || b=='I')
        b = 'I/J'
      for(let i=0;i<5;i++){
        for(let j=0;j<5;j++){
          if(a == this.KeyMatrix[i][j]){
            x1 = i;
            y1 = j;
          }
          if(b == this.KeyMatrix[i][j]){
            x2 = i;
            y2 = j;
          }
        }
      }
      this.Running1  =  this.takeFourNumber.subscribe(i => {
        i = cc;
        cc+=1;
        let table = document.getElementById("Visualizer");
        let rows = table.getElementsByTagName("tr");
        if(i==0){
          rows[x1].getElementsByTagName("td")[y1].className = "DeActivate";
          rows[x2].getElementsByTagName("td")[y2].className = "DeActivate";
        }
        else if(i==1){
          rows[x1].getElementsByTagName("td")[y1].className = "CodeActivate";
        }
        else if(i==2){
          if(x1 == x2){
            rows[x1].getElementsByTagName("td")[(y2+1)%5].className = "Activate";
            this.CipherText+=this.KeyMatrix[x1][(y1+1)%5];
          }
          else if(y1 == y2){
            rows[(x1+1)%5].getElementsByTagName("td")[y1].className = "Activate";
            this.CipherText+=this.KeyMatrix[(x1+1)%5][y1];
          }
          else{
            rows[x1].getElementsByTagName("td")[y2].className = "Activate";
            this.CipherText+=this.KeyMatrix[x1][y2];
          }
        }
        else if(i==3){
          rows[x1].getElementsByTagName("td")[y1].className = "DeActivate";
          if(x1 == x2){
            rows[x1].getElementsByTagName("td")[(y2+1)%5].className = "DeActivate";
          }
          else if(y1 == y2){
            rows[(x1+1)%5].getElementsByTagName("td")[y1].className = "DeActivate";
          }
          else{
            rows[x1].getElementsByTagName("td")[y2].className = "DeActivate";
          }
          rows[x2].getElementsByTagName("td")[y2].className = "CodeActivate";
        }
        else if(i==4){
          if(x1 == x2){
            rows[x2].getElementsByTagName("td")[(y2+1)%5].className = "Activate";
            this.CipherText+=this.KeyMatrix[x1][(y1+1)%5]+this.KeyMatrix[x2][(y2+1)%5];
          }
          else if(y1 == y2){
            rows[(x2+1)%5].getElementsByTagName("td")[y2].className = "Activate";
            this.CipherText+=this.KeyMatrix[(x2+1)%5][y2];
          }
          else{
            rows[x2].getElementsByTagName("td")[y1].className = "Activate";
            this.CipherText+=this.KeyMatrix[x2][y1];
          }
          
        }
        else{
          let T = document.getElementById("TextMatrix");
          let C = T.getElementsByTagName("tr")[0].getElementsByTagName("td")[x];
          C.className = "CodeDeActivate";
          let table = document.getElementById("Visualizer");
          let rows = table.getElementsByTagName("tr");
          for(let i=0;i<rows.length;i++){
            let col = rows[i].getElementsByTagName("td");
            for(let j=0;j<col.length;j++){
              col[j].className = 'Normal';
            }
          }
        }
      });
    });
  }
  ngOnInit(): void {

  }

}
