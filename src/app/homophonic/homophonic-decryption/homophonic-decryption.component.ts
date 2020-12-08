import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../homophonic.component';

@Component({
  selector: 'app-homophonic-decryption',
  templateUrl: './homophonic-decryption.component.html',
  styleUrls: ['./homophonic-decryption.component.css']
})
export class HomophonicDecryptionComponent implements OnInit {
  Speed: string ="100";
  text: string;
  Play: boolean;
  Keys: any;
  PlainText: string;
  CipherText:string;
  HCipherText: any;
  HDKeys: any;
  HDRKeys: any;

  constructor(
    public dialogRef: MatDialogRef<HomophonicDecryptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    console.log(data)
    this.Keys = this.data.Keys;
    this.CipherText = this.data.Text;
    let n = this.Keys[0].Replacement[0].length;
    let m = this.CipherText.length;
    this.HDKeys =  new Array(Math.floor(m/n));
    this.HDRKeys =  new Array(Math.floor(m/n));
    this.HCipherText = new Array(Math.floor(m/n));
    for(let i = 0 , l=0; i<m ; i+=n )
      this.HCipherText[l++] = this.CipherText.slice(i,i+n);
    this.text = " ".repeat(this.CipherText.length);
    console.log(this.HCipherText);
  }

  ngOnInit(): void {
  }

  
  validateValue() {
    if (parseInt(this.Speed) > 10000)
      this.Speed = "10000";
    else if (parseInt(this.Speed) < 100 || this.Speed == '')
      this.Speed = "100";
  }
  
  PlayDecryptionMethod() {
    this.text='';
    this.Play=true;
    let keyLength = this.Keys[0].Replacement[0].length;
    let flag=true;
    for(let i=0;i<this.HCipherText.length;i++){
      setTimeout(() => {
        flag = true;
        for(let j=0;j<this.Keys.length;j++){
          setTimeout(()=>{
            if(this.Keys[j].Replacement.indexOf(this.HCipherText[i])!=-1){
              flag=false;
              this.HDKeys[i]=this.Keys[j].Letter;
              this.HDRKeys[i]=this.Keys[j].Replacement;
              setTimeout(()=>{
                this.text+=this.HDKeys[i];
              },500);
            }
            if(flag){
              this.HDKeys[i]=this.Keys[j].Letter;
              this.HDRKeys[i]=this.Keys[j].Replacement;
            }
          },50*j)
          
        }
        if(i==this.HCipherText.length-1)
          this.Play=false;
      }, 50*this.Keys.length*i);
    }
  }
}
