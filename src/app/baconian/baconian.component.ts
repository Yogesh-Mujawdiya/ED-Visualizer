import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaconianDecryptionComponent } from './baconian-decryption/baconian-decryption.component';
import { BaconianEncryptionComponent } from './baconian-encryption/baconian-encryption.component';

@Component({
  selector: 'app-baconian',
  templateUrl: './baconian.component.html',
  styleUrls: ['./baconian.component.css']
})
export class BaconianComponent implements OnInit {
  PlainText: string;
  CipherText: string;
  Key: any;
  DKey: any;

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.PlainText = "YogeshKumar";
    this.Key = {
      'A': 'AAAAA', 'B': 'AAAAB', 'C': 'AAABA', 'D': 'AAABB', 'E': 'AABAA',
      'F': 'AABAB', 'G': 'AABBA', 'H': 'AABBB', 'I': 'ABAAA', 'J': 'ABAAB',
      'K': 'ABABA', 'L': 'ABABB', 'M': 'ABBAA', 'N': 'ABBAB', 'O': 'ABBBA',
      'P': 'ABBBB', 'Q': 'BAAAA', 'R': 'BAAAB', 'S': 'BAABA', 'T': 'BAABB',
      'U': 'BABAA', 'V': 'BABAB', 'W': 'BABBA', 'X': 'BABBB', 'Y': 'BBAAA', 'Z': 'BBAAB'
    };
    this.DKey = {
      'AAAAA': 'A', 'AAAAB': 'B', 'AAABA': 'C', 'AAABB': 'D', 'AABAA': 'E',
      'AABAB': 'F', 'AABBA': 'G', 'AABBB': 'H', 'ABAAA': 'I', 'ABAAB': 'J',
      'ABABA': 'K', 'ABABB': 'L', 'ABBAA': 'M', 'ABBAB': 'N', 'ABBBA': 'O',
      'ABBBB': 'P', 'BAAAA': 'Q', 'BAAAB': 'R', 'BAABA': 'S', 'BAABB': 'T',
      'BABAA': 'U', 'BABAB': 'V', 'BABBA': 'W', 'BABBB': 'X', 'BBAAA': 'Y', 'BBAAB': 'Z'
    };
    this.Encryption();
  }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  openEncryptionDialog() {
    if (this.Encryption()) {
      const dialogRef = this.dialog.open(BaconianEncryptionComponent, {
        width: "98%",
        maxWidth: "800px",
        data: { Key: '', Text: this.PlainText }
      });
    }
  }

  openDecryptionDialog() {
    if (this.Decryption()) {
      const dialogRef = this.dialog.open(BaconianDecryptionComponent, {
        width: '98%',
        maxWidth: '800px',
        data: { Key: '', Text: this.CipherText }
      });
    }
  }

  Encryption(): boolean {
    this.PlainText = this.PlainText.toUpperCase();
    this.CipherText = this.BaconianEncryption(this.PlainText);
    return true;
  }

  Decryption(): boolean {
    this.CipherText = this.CipherText.toUpperCase();
    this.PlainText = this.BaconianDecryption(this.CipherText);
    return true;
  }

  BaconianEncryption(text: string): string {
    let cipherText = "";
    for (let i = 0; i < text.length; i++)
      if (this.Key[text[i]] != undefined)
        cipherText += this.Key[text[i]];
      else
        cipherText += text[i];
    return cipherText;
  }

  BaconianDecryption(cipher: string): string {
    let plainText = "";
    for (let i = 0; i < cipher.length; i+=5){
      if (this.DKey[cipher.slice(i,i+5)] != undefined)
        plainText += this.DKey[cipher.slice(i,i+5)];
      else
        plainText += cipher.slice(i,i+5);
    }
    return plainText;
  }
}
