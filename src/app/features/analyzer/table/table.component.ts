import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IAutomata } from '../interfaces/IAutomata';
import { IState } from '../interfaces/IStae';
import { IInput, ITransision } from '../interfaces/ITransision';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() automata: IAutomata | undefined;

  public simplifiedAutomata: IAutomata | undefined;

  public dataSource: any[];

  public keys: any[];

  public values: any[];

  public displayedColumns: string[] = [];


  ngOnInit(): void { }

  ngOnChanges(): void {
    try {
      this.setDataTable()
    } catch (error) {
      console.log('ERROR 5: EL automata no está bien formado');
      window.location.reload();
    }
  }

  public setDataTable() {
    this.dataSource = [];
    this.displayedColumns = []
    if (this.automata && this.automata?.transicions?.length && this.automata.states?.length) {
      let inputs: any = {};
      let row: any = {};
      let rows: any = []
      this.automata.transicions.forEach((trans: ITransision) => {
        trans.inputs.forEach((input: IInput) => { inputs = { ...inputs, [input.value]: input.to } });
        let acceptance = this.automata &&
          this.automata.states &&
          this.automata.states.find((state: IState) => state.name === trans.state)?.acceptance;
        row = { state: trans.state, ...inputs, acceptance };
        rows.push(row);
      })
      this.dataSource = rows;
      this.displayedColumns = this.displayedColumns.concat(Object.keys(this.dataSource[0]));
      this.removeItemFromArr(this.displayedColumns, 'state');
      this.displayedColumns.unshift('state');
    } else {
      this.automata = undefined
    }
  }

  private removeItemFromArr(arr: any[], item: string) {
    var i = arr.indexOf(item);
    if (i !== -1) {
      arr.splice(i, 1);
    }
  }
}
