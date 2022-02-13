import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfComponent } from './pdf.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DemoMaterialModule } from 'src/app/material-module';

@NgModule({
  declarations: [
    PdfComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    DemoMaterialModule,
  ],
  exports:  [PdfComponent],
})
export class PdfModule { }
