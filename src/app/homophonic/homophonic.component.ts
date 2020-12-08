import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HomophonicDecryptionComponent } from './homophonic-decryption/homophonic-decryption.component';
import { HomophonicEncryptionComponent } from './homophonic-encryption/homophonic-encryption.component';


export interface DialogData {
  Keys  : any;
  Text  : string;
}

@Component({
  selector: 'app-homophonic',
  templateUrl: './homophonic.component.html',
  styleUrls: ['./homophonic.component.css']
})
export class HomophonicComponent implements OnInit {

  
  PlainText:string;
  CipherText:string;
  Keys = [
    { Letter: 'A', Replacement: ['21','27','31','40'] },
    { Letter: 'B', Replacement: ['15'] },
    { Letter: 'C', Replacement: ['01','33'] },
    { Letter: 'D', Replacement: ['20','34'] },
    { Letter: 'E', Replacement: ['22','28','32','36','37'] },
    { Letter: 'F', Replacement: ['05'] },
    { Letter: 'G', Replacement: ['17'] },
    { Letter: 'H', Replacement: ['14'] },
    { Letter: 'I', Replacement: ['02','29','38','41'] },
    { Letter: 'J', Replacement: ['19'] },
    { Letter: 'K', Replacement: ['03'] },
    { Letter: 'L', Replacement: ['07','39','42'] },
    { Letter: 'M', Replacement: ['09','43'] },
    { Letter: 'N', Replacement: ['12','48','97'] },
    { Letter: 'O', Replacement: ['18','60','85'] },
    { Letter: 'P', Replacement: ['26','44'] },
    { Letter: 'Q', Replacement: ['25'] },
    { Letter: 'R', Replacement: ['24','49'] },
    { Letter: 'S', Replacement: ['10','30','45','99'] },
    { Letter: 'T', Replacement: ['06','96','55'] },
    { Letter: 'U', Replacement: ['16','94'] },
    { Letter: 'V', Replacement: ['23'] },
    { Letter: 'W', Replacement: ['13'] },
    { Letter: 'X', Replacement: ['11'] },
    { Letter: 'Y', Replacement: ['08'] },
    { Letter: 'Z', Replacement: ['04'] },
    { Letter: 'a', Replacement: ['35','61','86','98'] },
    { Letter: 'b', Replacement: ['83'] },
    { Letter: 'c', Replacement: ['93','57'] },
    { Letter: 'd', Replacement: ['84','46'] },
    { Letter: 'e', Replacement: ['47','91','62','50','95'] },
    { Letter: 'f', Replacement: ['92'] },
    { Letter: 'g', Replacement: ['63'] },
    { Letter: 'h', Replacement: ['83'] },
    { Letter: 'i', Replacement: ['64','87','52','90'] },
    { Letter: 'j', Replacement: ['82'] },
    { Letter: 'k', Replacement: ['65'] },
    { Letter: 'l', Replacement: ['81','51','89'] },
    { Letter: 'm', Replacement: ['66','53'] },
    { Letter: 'n', Replacement: ['80','54','88'] },
    { Letter: 'o', Replacement: ['67','56','3_'] },
    { Letter: 'p', Replacement: ['79','58'] },
    { Letter: 'q', Replacement: ['68'] },
    { Letter: 'r', Replacement: ['78','1_'] },
    { Letter: 's', Replacement: ['69','5_','8_','_7'] },
    { Letter: 't', Replacement: ['77','9_','00'] },
    { Letter: 'u', Replacement: ['70','_0'] },
    { Letter: 'v', Replacement: ['76'] },
    { Letter: 'w', Replacement: ['72'] },
    { Letter: 'x', Replacement: ['74'] },
    { Letter: 'y', Replacement: ['71'] },
    { Letter: 'z', Replacement: ['75'] },
  ];
  NewLetter: string;
  NewReplacement: string;

  constructor(
    public dialog:MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.PlainText = "Yogesh";
    this.Encryption();
  }

  ngOnInit(): void {
  }

  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  

  deleteRow(d){
    let index = this.Keys.indexOf(d);
    this.Keys.splice(index, 1);
    this.openSnackBar("Key : "+d.Leter+" Deleted","Success");
  }
  
  addRow(){
    let K = []
    for(let i=0;i<this.Keys.length;i++)
      K.push(this.Keys[i].Letter)
    if(this.NewLetter=='')
      this.openSnackBar("Required Letter Field","Error");
    else if(this.NewReplacement=='')
      this.openSnackBar("Required Replacements Field","Error");
    else if(K.indexOf(this.NewLetter)!=-1)
      this.openSnackBar("Key : "+this.NewLetter+" already available","Error");
    else{
      this.Keys.push({ Letter: this.NewLetter, Replacement: this.NewReplacement.split(',') });
      this.openSnackBar(this.NewLetter+" Key Added","Success");
    }
  }


  
  openEncryptionDialog(){
    if(this.Encryption()){
      const dialogRef = this.dialog.open(HomophonicEncryptionComponent, {
        width   : "98%",
        maxWidth: "800px",
        data: {Keys: this.Keys, Text: this.PlainText}
      });
    }
  }

  openDecryptionDialog(){
    if(this.Decryption()){
      const dialogRef = this.dialog.open(HomophonicDecryptionComponent, {
        width: '98%',
        maxWidth: '800px',
        data: {Keys: this.Keys, Text: this.CipherText}
      });
    }
  }

  Encryption():boolean{
    this.CipherText="";
    let flag=true;
    for(let i=0;i<this.PlainText.length;i++){
      for(let j=0;j<this.Keys.length;j++)
        if(this.PlainText[i]===this.Keys[j].Letter){
          this.CipherText+=this.Keys[j].Replacement[Math.floor(Math.random() * this.Keys[j].Replacement.length)];
          flag=false;
        }
      if(flag)
        this.CipherText+=this.PlainText[i];
    }
    return true; 
  }
  
  Decryption():boolean{
    this.PlainText = "";
    let keyLength = this.Keys[0].Replacement[0].length;
    let flag=true;
    for(let i=0;i<this.CipherText.length;i+=keyLength){
      let K = this.CipherText.slice(i,i+keyLength);
      for(let j=0;j<this.Keys.length;j++)
        if(this.Keys[j].Replacement.indexOf(K)!=-1){
          this.PlainText+=this.Keys[j].Letter;
          flag=false;
          break;
        }
      if(flag)
        this.PlainText+=this.CipherText[i];
    }
    return true; 
  }
}
