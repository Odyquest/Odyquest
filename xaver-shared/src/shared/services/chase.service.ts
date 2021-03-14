import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Chase } from '../models/chase'
import { deserialize, serialize, Serializable, JsonProperty } from 'typescript-json-serializer';

@Injectable({
  providedIn: 'root'
})
export class ChaseService {

  //  // ============== ONLY FOR DEVELOPING =============
  //
  //  httpOptions = {
  //    headers: new HttpHeaders({
  //      'Content-Type': 'application/json',
  //      'Authorization': 'Basic ' + btoa('admin:Admin123')
  //    })
  //  };
  //  // ===============================================
  readonly SERVER_BASE_URI_LOCAL = 'assets-shared/examples/';
  readonly SERVER_BASE_URI = 'http://localhost:8444/api/';

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllChases(): Observable<any> {
    return this.httpClient.get(this.SERVER_BASE_URI_LOCAL + 'chase-list.json')
      // return this.httpClient.get(this.SERVER_BASE_URI + 'chase')
      .pipe(
        map(chases => {
          // console.log("chases: " + chases);
          return chases;
        }),
        catchError(error => {
          // console.log("error: " + JSON.stringify(error));
          return error;
        })
      )
  }

  public getChase(id: string): Observable<any> {
    return this.httpClient.get(this.SERVER_BASE_URI_LOCAL + id + '/chase.json')
      // return this.httpClient.get(this.SERVER_BASE_URI + 'chase/' + id)
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

  public createChase(p_chase: Chase): Observable<any> {
    return this.httpClient.post(
      this.SERVER_BASE_URI + '/chase', { "chase": { "metaData": serialize(p_chase.metaData, true) } })
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


}
