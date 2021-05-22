import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Chase } from '../models/chase'
import { deserialize, serialize } from 'typescript-json-serializer';
import { ServerEnvironment } from '../environments/environment';

/**
 * Connection to data source for reading and writing chases
 *
 * Actual data source is configured in ServerEnvironment
 */
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

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * Get list of ChaseMetaData from configured data source.
   *
   * @return observable of type ChaseList
   */
  public getAllChases(): Observable<any> {
    return this.httpClient.get(this.getChaseListPath())
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

  /**
   * Read chase with given id from configured data source.
   *
   * @return observable of type Chase
   */
  public getChase(id: string): Observable<any> {
    return this.httpClient.get(this.getChasePath(id))
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

  /**
   * Create chase in data source
   */
  public createChase(p_chase: Chase): Observable<any> {
    // TODO return error if ServerEnvironment.api_based is false
    return this.httpClient.post(
      ServerEnvironment.base_uri + '/chase', { "chase": { "metaData": serialize(p_chase.metaData, true) } })
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

  private getChaseListPath(): string {
    if (ServerEnvironment.api_based === true) {
      return ServerEnvironment.base_uri + 'chase';
    } else {
      return ServerEnvironment.base_uri + 'chase-list.json';
    }
  }

  private getChasePath(id: string): string {
    if (ServerEnvironment.api_based === true) {
      return ServerEnvironment.base_uri + 'chase/' + id;
    } else {
      return ServerEnvironment.base_uri + id + '/chase.json';
    }
  }

}
