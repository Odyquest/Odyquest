import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChaseService {

  readonly SERVER_ADR = 'https://localhost:';
  readonly SERVER_PORT = '8445';
  readonly CHASE_IDENTIFIER = '/api/quest'
  readonly SERVER_BASE_URI = this.SERVER_ADR + this.SERVER_PORT + this.CHASE_IDENTIFIER;

  // ============== ONLY FOR DEVELOPING =============

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin:Admin123')
    })
  };
  // ===============================================
  public chases = new Subject<any>()

  constructor(
    private httpClient: HttpClient

  ) { }

  public getAllChases(): Observable<any> {
    // console.log('Service: getAllChases()', this.SERVER_BASE_URI);
    // return this.httpClient.get(this.SERVER_BASE_URI)
    return this.httpClient.get('assets-shared/examples/chase-list.json')
      .pipe(
        map(chases => {
          return chases;
        }),
        catchError(error => {
          return error;
        })
      )
  }

  public getChase(id: string): Observable<any> {
    //return this.httpClient.get(this.SERVER_BASE_URI + "/10000000-0000-0000-0000-000000000000")
    return this.httpClient.get('assets-shared/examples/' + id + '/chase.json')
      .pipe(
        map(chase => {
          console.log("Success");
          return chase;
        }),
        catchError(error => {
          console.log("Failure");
          return error;
        })
      )
  }

  public getDefaultChase() {
    return this.httpClient.get(this.SERVER_BASE_URI + "/10000000-0000-0000-0000-000000000000")
      .pipe(
        map(chase => {
          return chase;
        }),
        catchError(error => {
          return error;
        })
      )
  }
}
