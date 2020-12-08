import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { interval } from 'rxjs';
import { startWith, take, finalize } from 'rxjs/operators';
import { DialogData } from 'src/app/rail-fence/rail-fence.component';

@Component({
  selector: 'app-rail-fence-decryption',
  templateUrl: './rail-fence-decryption.component.html',
  styleUrls: ['./rail-fence-decryption.component.css']
})
export class RailFenceDecryptionComponent implements OnInit {

  Speed: string = "100";
  Key: number;
  CipherText: string;
  PlainText: string;
  Play: boolean;
  Loop: any;
  Running: any;
  Prev: any;
  PlainTextMatrix: any[];

  constructor(
    public dialogRef: MatDialogRef<RailFenceDecryptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.Key = parseInt(data.Key);
    this.CipherText = data.Text;
    this.PlainText = "";
    this.PlainTextMatrix = new Array(this.Key);
    for (let i = 0; i < this.Key; i++) 
      this.PlainTextMatrix[i] = new Array(this.CipherText.length);
  }



  ngOnDestroy(): void {
    if (this.Running != undefined)
      this.Running.unsubscribe();
  }

  validateValue() {
    if (parseInt(this.Speed) > 9999)
      this.Speed = "9999";
    else if (parseInt(this.Speed) < 100 || this.Speed == '')
      this.Speed = "100";
  }

  PlayEncryption() {
    for (let i = 0; i < this.Key; i++) {
      for (let j = 0; j < this.CipherText.length; j++)
        this.PlainTextMatrix[i][j] = '';
    }
    this.Prev = null;
    this.PlainText = "";
    let dir_down = false;
    this.Loop = interval(parseInt(this.Speed)).pipe(
      startWith(0),
      take(this.Key * this.CipherText.length + this.CipherText.length * 2)
    );
    let table = document.getElementById("Visualizer");
    let rows = table.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
      let col = rows[i].getElementsByTagName("td");
      for (let j = 0; j < col.length; j++) {
        col[j].className = 'Normal';
      }
    }
    if (this.Running != undefined)
      this.Running.unsubscribe();
    let index = 0;
    let r = 0, c = 0;
    let R = 0, C = 0;
    let In = 0;
    dir_down = false;
    let dirdown = false;
    this.Running = this.Loop.subscribe(x => {
      if (index < this.CipherText.length) {
        if (r == 0)
          dir_down = true;
        if (r == this.Key - 1)
          dir_down = false;
        this.PlainTextMatrix[r][c++] = '*';
        dir_down ? r++ : r--;
      }
      else if (index >= this.CipherText.length && index < this.CipherText.length * (this.Key + 1)) {
        let I = index - this.CipherText.length;
        let i = Math.floor(I / this.CipherText.length);
        let j = I % this.CipherText.length;
        if (this.PlainTextMatrix[i][j] == '*')
          this.PlainTextMatrix[i][j] = this.CipherText[In++];
        let col = rows[i].getElementsByTagName("td");
        col[j].className = 'DeActivate';
      }
      else {
        if (R == 0)
          dirdown = true;
        if (R == this.Key - 1)
          dirdown = false;
        if (this.PlainTextMatrix[R][C] != '') {
          let col = rows[R].getElementsByTagName("td");
          col[C].className = 'Activate';
          this.PlainText += this.PlainTextMatrix[R][C++]
        }
        dirdown ? R++ : R--;
      }
      index++;
    })
  }
  ngOnInit(): void {

  }

}