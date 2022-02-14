
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAutomata } from '../interfaces/IAutomata';
import { IState } from '../interfaces/IStae';
import { IInput, ITransision } from '../interfaces/ITransision';


@Component({
  selector: 'app-input-modal',
  templateUrl: './input-modal.component.html',
  styleUrls: ['./input-modal.component.scss']
})
export class InputModalComponent implements OnInit {

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  lastFormGroup: FormGroup;

  public states!: IState[];
  public inputs: string[] = [];
  public transisions: ITransision[];
  public currentState: IState | undefined;
  public stateIndex: number = 0;
  public inputIndex: number = 0;
  public automata: any;
  public type!: Number | undefined;

  public currentTransision!: ITransision | undefined;

  constructor(
    public dialogRef: MatDialogRef<InputModalComponent>,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.states = [
    ]
    this.transisions = []
    this.automata = {}
  }

  selectedStatus: Array<string>;

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [''],
      statusControl: [true],
    });
    this.secondFormGroup = this._formBuilder.group({
      name: ['']
    });
    this.lastFormGroup = this._formBuilder.group({
      transision: ['']
    });
  }

  public resetstates() {
    this.states = [];
    this.type = undefined;
    this.firstFormGroup.controls['firstCtrl'].setValue('');
    this.firstFormGroup.controls['statusControl'].setValue(false);
  }

  public addState(): void {
    let name = this.firstFormGroup.controls['firstCtrl'].value;
    let exist = this.states.find((item: IState) => item.name === name);
    if (!exist) {
      let acceptance = this.firstFormGroup.controls['statusControl'].value;
      let state = {
        name: name,
        acceptance: acceptance
      }
      this.states.push(state);
    } else {
      this._snackBar.open('Error: el estado ya existe', 'X', { duration: 1500, panelClass: ['red-snackbar'] });
    }
    this.firstFormGroup.controls['firstCtrl'].setValue('');
    this.firstFormGroup.controls['statusControl'].setValue(false);
  }

  public addInput(): void {
    if (this.states.length > 0) {
      this.currentState = this.states[0];
    }
    let name = this.secondFormGroup.controls['name'].value;
    let exist = this.inputs.find((item: string) => item === name);
    if (!exist) {
      this.inputs.push(name);
    } else {
      this._snackBar.open('Error: la entrada ya existe', 'X', { duration: 1500, panelClass: ['red-snackbar'] });
    }
    this.secondFormGroup.controls['name'].setValue('');
  }

  public addTransision(): void {
    if (this.currentState && this.currentState.name) {
      if (!this.currentTransision?.inputs.length || !this.currentTransision?.state) {
        // ENTRA LA PRIMER VEZ
        this.currentTransision = {
          state: '',
          inputs: []
        }
        this.currentTransision.state = this.currentState.name;
      }
      this.setType();
      if (this.validateToAdd()) {
        if (this.inputs.length - 1 > this.inputIndex) {
          this.inputIndex++;
        } else {
          this.inputIndex = 0;
          this.stateIndex++;
          if (this.currentTransision) {
            this.transisions.push(this.currentTransision);
            this.currentTransision = undefined;
          }
        }
        this.currentState = this.states[this.stateIndex];
      }

    }
  }

  private validateToAdd(): boolean {
    if (this.currentTransision) {
      let transision: string = this.lastFormGroup.controls['transision'].value.toString();
      if (transision.includes(',')) {
        this.currentTransision.inputs.push({
          value: this.inputs[this.inputIndex].toString(), // entrada
          to: this.lastFormGroup.controls['transision'].value.toString() // estado
        })
        this.lastFormGroup.controls['transision'].setValue(undefined)
        return true;
      } else {
        let exist = this.states.find((item) => item.name === transision);
        if (exist) {
          this.currentTransision.inputs.push({
            value: this.inputs[this.inputIndex].toString(), // entrada
            to: this.lastFormGroup.controls['transision'].value.toString() // estado
          })
          this.lastFormGroup.controls['transision'].setValue(undefined)
          return true;
        } else {
          this.lastFormGroup.controls['transision'].setValue(undefined)
          this._snackBar.open('Error: estádo no aceptado', 'X', { duration: 1500, panelClass: ['red-snackbar'] });
          return false;
        }
      }
    }
    this.lastFormGroup.controls['transision'].setValue(undefined)
    return false
  }

  private setType() {
    let include = this.lastFormGroup.controls['transision'].value.toString().includes(',');
    if (!this.type) {
      this.type = include ? 1 : 0;
    } else {
      if (this.type !== 1) {
        this.type = include ? 1 : 0;
      }
    }
  }

  getAutomata(): IAutomata | undefined {
    if (this.validateAutomata()) {
      return <IAutomata>{
        states: this.states,
        inputs: this.inputs,
        transicions: this.transisions,
        type: this.type || 0
      }
    }
    return undefined

  }

  public sendStates() {
    this.dialogRef.close();
  }

  public validateAutomata(): boolean {
    return !(this.automata && this.automata.states &&
      this.automata.states.length && this.automata.transicions &&
      this.automata.transicions.length && this.automata.inputs &&
      this.automata.inputs.length &&
      this.automata.type)
  }
}
