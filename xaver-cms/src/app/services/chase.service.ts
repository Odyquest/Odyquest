import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChaseService {

  // TODO: Replace SERVER_ADR
  readonly SERVER_ADR = 'https://goebelcloud.de:';
  readonly SERVER_PORT = '8444';
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

  public getAllChases() {
    console.log('Service: getAllChases()', this.SERVER_BASE_URI);
    return this.httpClient.get(this.SERVER_BASE_URI)
      .pipe(
        map(chases => {
          return chases;
        }),
        catchError(error => {
          return error;
        })
      )
  }
}
