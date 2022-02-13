import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnalyzerService } from '../services/analyzer.service';
import { InputModalComponent } from './input-modal/input-modal.component';
import { IAutomata } from './interfaces/IAutomata';
@Component({
  selector: 'app-analyzer',
  templateUrl: './analyzer.component.html',
  styleUrls: ['./analyzer.component.scss']
})
export class AnalyzerComponent implements OnInit {

  constructor(
    private analyzer: AnalyzerService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  public automata!: IAutomata | undefined;

  public showEvaluate = false;

  public evaluateString!: string;

  ngOnInit() { }

  public openInputDialog(): void {

    try {
      if (this.automata && this.automata.states?.length && this.automata.inputs?.length) {
        // console.log('erase')
        this.clean()
      }
      const dialogRef = this.dialog.open(InputModalComponent, {
        width: '900px',
      });
      dialogRef.afterClosed().subscribe((automata: IAutomata) => {
        if (automata) {
          this.automata = automata;
          this._snackBar.open('Automata ingresado!!', '✔', { duration: 1500, panelClass: ['green-snackbar'] });
        } else {
          this._snackBar.open('Automata mal formado. Valide el formato e ingreselo nuevamente', 'X', { duration: 1500, panelClass: ['red-snackbar'] });
          this.clean();
        }
      });
    } catch (error) {
      this._snackBar.open('Automata mal formado. Valide el formato e ingreselo nuevamente', 'X', { duration: 1500, panelClass: ['red-snackbar'] });
      this.clean();
    }
  }

  public evaluate(): void {
    if (this.automata && this.evaluateString !== '') {
      let body = {
        automata: { ...this.automata },
        expression: this.evaluateString
      }
      this.analyzer.evaluate(body).subscribe((response: any) => {
        if (response && response.accepted) {
          this._snackBar.open('Secuencia aceptada!!', '✔', { duration: 1500, panelClass: ['green-snackbar'] });
        } else {
          this._snackBar.open('Secuencia rechazada :(', 'X', { duration: 1500, panelClass: ['red-snackbar'] });
        }
      }, () => {
        this._snackBar.open('Secuencia rechazada :(', 'X', { duration: 1500, panelClass: ['red-snackbar'] });
      })
    }
  }

  public clean() {
    this.showEvaluate = false;
    this.evaluateString = '';
    this.automata = undefined;
    this._snackBar.open('Automata eliminado', '✔', { duration: 1500, panelClass: ['green-snackbar'] });
  }

  public simplify() {
    if (this.automata) {
      this.analyzer.simplifyAutomat(this.automata).subscribe((automata: IAutomata) => {
        if (automata) {
          this.showEvaluate = true;
          this.automata = automata;
          this._snackBar.open('Automata simplificado', '✔', { duration: 1500, panelClass: ['green-snackbar'] });
        } else {
          this._snackBar.open('eL Automata NO pudo ser simplificado', 'X', { duration: 1500, panelClass: ['red-snackbar'] });
        }
      }, () => {
        this._snackBar.open('eL Automata NO pudo ser simplificado', 'X', { duration: 1500, panelClass: ['red-snackbar'] });
      })
    }
  }
}
