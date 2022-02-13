import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team.component';
import { DemoMaterialModule } from 'src/app/material-module';



@NgModule({
  declarations: [
    TeamComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule
  ],
  exports: [TeamComponent]
})
export class TeamModule { }
