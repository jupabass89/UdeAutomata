import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfComponent } from './pdf.component';

@NgModule({
  declarations: [
    PdfComponent
  ],
  imports: [
    CommonModule
  ],
  exports:  [PdfComponent],
})
export class PdfModule { }
