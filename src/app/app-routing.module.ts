import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaconianComponent } from './baconian/baconian.component';
import { HomophonicComponent } from './homophonic/homophonic.component';
import { MonoalphabeticComponent } from './monoalphabetic/monoalphabetic.component';
import { PlayfairComponent } from './playfair/playfair.component';
import { PolygramSubstituitonComponent } from './polygram-substituiton/polygram-substituiton.component';
import { RailFenceComponent } from './rail-fence/rail-fence.component';
import { RowTranspositionComponent } from './row-transposition/row-transposition.component';
import { SimpleCipherComponent } from './simple-cipher/simple-cipher.component';
import { VigenereCipherComponent } from './vigenere-cipher/vigenere-cipher.component';
import { XOrCipherComponent } from './x-or-cipher/x-or-cipher.component';

const routes: Routes = [
  { 
    path: 'Row_Transposition',
    component:RowTranspositionComponent
  },
  { 
    path: 'Playfair',
    component:PlayfairComponent
  },
  { 
    path: 'Polygram_Substituiton',
    component:PolygramSubstituitonComponent
  },
  { 
    path: 'Homophonic',
    component:HomophonicComponent
  },
  { 
    path: 'Rail_Fence',
    component:RailFenceComponent
  },
  { 
    path: 'Simple_Cipher',
    component:SimpleCipherComponent
  },
  { 
    path: 'Monoalphabetic',
    component:MonoalphabeticComponent
  },
  { 
    path: 'VigenereCipher',
    component:VigenereCipherComponent
  },
  { 
    path: 'X_Or_Cipher',
    component:XOrCipherComponent
  },
  { 
    path: 'Baconian_Cipher',
    component:BaconianComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
