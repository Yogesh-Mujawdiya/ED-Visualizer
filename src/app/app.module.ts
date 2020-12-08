import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RowTranspositionComponent } from './row-transposition/row-transposition.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule, HashLocationStrategy, LocationStrategy } from "@angular/common";


import { RowTranspositionEncryptionDialogComponent } from './row-transposition/row-transposition-encryption-dialog/row-transposition-encryption-dialog.component';
import { RowTranspositionDecryptionDialogComponent } from './row-transposition/row-transposition-decryption-dialog/row-transposition-decryption-dialog.component';
import { PolygramSubstituitonComponent } from './polygram-substituiton/polygram-substituiton.component';
import { PolygramSubstituitonDecryptionComponent } from './polygram-substituiton/polygram-substituiton-decryption/polygram-substituiton-decryption.component';
import { PolygramSubstituitonEncryptionComponent } from './polygram-substituiton/polygram-substituiton-encryption/polygram-substituiton-encryption.component';
import { HomophonicComponent } from './homophonic/homophonic.component';
import { HomophonicDecryptionComponent } from './homophonic/homophonic-decryption/homophonic-decryption.component';
import { HomophonicEncryptionComponent } from './homophonic/homophonic-encryption/homophonic-encryption.component';
import { PlayfairComponent } from './playfair/playfair.component';
import { PlayfairEncryptionComponent } from './playfair/playfair-encryption/playfair-encryption.component';
import { PlayfairDecryptionComponent } from './playfair/playfair-decryption/playfair-decryption.component';
import { RailFenceComponent } from './rail-fence/rail-fence.component';
import { RailFenceEncryptionComponent } from './rail-fence/rail-fence-encryption/rail-fence-encryption.component';
import { RailFenceDecryptionComponent } from './rail-fence/rail-fence-decryption/rail-fence-decryption.component';
import { SimpleCipherComponent } from './simple-cipher/simple-cipher.component';
import { SimpleCipherEncryptionComponent } from './simple-cipher/simple-cipher-encryption/simple-cipher-encryption.component';
import { SimpleCipherDecryptionComponent } from './simple-cipher/simple-cipher-decryption/simple-cipher-decryption.component';
import { MonoalphabeticComponent } from './monoalphabetic/monoalphabetic.component';
import { MonoalphabeticEncryptionComponent } from './monoalphabetic/monoalphabetic-encryption/monoalphabetic-encryption.component';
import { MonoalphabeticDecryptionComponent } from './monoalphabetic/monoalphabetic-decryption/monoalphabetic-decryption.component';
import { VigenereCipherComponent } from './vigenere-cipher/vigenere-cipher.component';
import { VigenereCipherEncryptionComponent } from './vigenere-cipher/vigenere-cipher-encryption/vigenere-cipher-encryption.component';
import { VigenereCipherDecryptionComponent } from './vigenere-cipher/vigenere-cipher-decryption/vigenere-cipher-decryption.component';
import { XOrCipherComponent } from './x-or-cipher/x-or-cipher.component';
import { XOrCipherEncryptionComponent } from './x-or-cipher/x-or-cipher-encryption/x-or-cipher-encryption.component';
import { XOrCipherDecryptionComponent } from './x-or-cipher/x-or-cipher-decryption/x-or-cipher-decryption.component';
import { BaconianComponent } from './baconian/baconian.component';
import { BaconianEncryptionComponent } from './baconian/baconian-encryption/baconian-encryption.component';
import { BaconianDecryptionComponent } from './baconian/baconian-decryption/baconian-decryption.component';

@NgModule({
  declarations: [
    AppComponent,
    RowTranspositionComponent,
    RowTranspositionDecryptionDialogComponent,
    RowTranspositionEncryptionDialogComponent,
    FooterComponent,
    PolygramSubstituitonComponent,
    PolygramSubstituitonDecryptionComponent,
    PolygramSubstituitonEncryptionComponent,
    HomophonicComponent,
    HomophonicDecryptionComponent,
    HomophonicEncryptionComponent,
    PlayfairComponent,
    PlayfairEncryptionComponent,
    PlayfairDecryptionComponent,
    RailFenceComponent,
    RailFenceEncryptionComponent,
    RailFenceDecryptionComponent,
    SimpleCipherComponent,
    SimpleCipherEncryptionComponent,
    SimpleCipherDecryptionComponent,
    MonoalphabeticComponent,
    MonoalphabeticEncryptionComponent,
    MonoalphabeticDecryptionComponent,
    VigenereCipherComponent,
    VigenereCipherEncryptionComponent,
    VigenereCipherDecryptionComponent,
    XOrCipherComponent,
    XOrCipherEncryptionComponent,
    XOrCipherDecryptionComponent,
    BaconianComponent,
    BaconianEncryptionComponent,
    BaconianDecryptionComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})

export class AppModule { }
