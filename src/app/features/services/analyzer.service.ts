import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAutomata } from '../analyzer/interfaces/IAutomata';
@Injectable({
  providedIn: 'root'
})
export class AnalyzerService {

  constructor(private http: HttpClient) { }

  public headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type',
    // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
  }


  public simplifyAutomat(automat: IAutomata): Observable<IAutomata> {
    let response: IAutomata = {
      "type": 0,
      "states": [
        { "name": "A", "acceptance": false },
        { "name": "B", "acceptance": true }
      ],
      "inputs": [
        '0',
        '1'
      ],
      "transicions": [
        {
          "state": "A",
          "inputs": [
            {
              "value": '0',
              "to": "A"
            },
            {
              "value": '1',
              "to": "A"
            }
          ]
        },
        {
          "state": "B",
          "inputs": [
            {
              "value": '0',
              "to": "A"
            },
            {
              "value": '1',
              "to": "A"
            }
          ]
        }
      ]
    }
    return this.http.post<IAutomata>('https://automata.azurewebsites.net/api/simplificar', automat, { headers: this.headers });
    // return of(response);
  }

  public evaluate(automat: any): Observable<any> {
    return this.http.post<IAutomata>('https://automata.azurewebsites.net/api/reconocer', automat, { headers: this.headers });
    // return of({});
  }
}
