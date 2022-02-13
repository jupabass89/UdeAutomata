import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyzerComponent } from './analyzer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DemoMaterialModule } from '../../material-module';
import { InputModalComponent } from './input-modal/input-modal.component';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [
    AnalyzerComponent,
    InputModalComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    
  ],
  exports: [AnalyzerComponent]
})
export class AnalyzerModule { }

