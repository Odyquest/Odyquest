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

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvZHlxdWVzdCIsIm5hbWUiOiJYYXZlciIsImlhdCI6MTUxNjIzOTAyMn0.IdZh-go3WrO-9vefWeFrUuKk6bw90RimWvuwHM7DcCM'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * Get list of ChaseMetaData from configured data source.
   *
   * @return observable of type ChaseList
   */
  public getAllChases(): Observable<any> {
    return this.httpClient.get(this.getChaseListPath(), this.httpOptions)
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
    return this.httpClient.get(this.getChasePath(id), this.httpOptions)
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
   *
   * @return observable containing chaseId
   */
  public createOrUpdateChase(p_chase: Chase): Observable<any> {
    // TODO return error if ServerEnvironment.api_based is false: not allowed
    return this.httpClient.post(
      ServerEnvironment.base_uri + 'chase', serialize(p_chase), this.httpOptions)
      .pipe(
        map(chaseId => {
          console.log("Successfull pushed chase to server");
          return chaseId["chaseId"];
        }),
        catchError(error => {
          console.log("Failure while pushing chase to server");
          return error;
        })
      )
  }

  /**
   * Delete chase with given id from configured data source.
   */
  public deleteChase(id: string): Observable<any> {
    return this.httpClient.delete(this.getChasePath(id), this.httpOptions)
      .pipe(
        map(chase => {
          console.log("Successfull deleted chase");
          return chase;
        }),
        catchError(error => {
          console.log("Failure while deleting chase");
          return error;
        })
      );
  }

  /**
   * Create media file in data source
   *
   * @return observable containing url to data relative to ServerEnvironment.base_uri
   */
  public createMedia(data: Chase): Observable<any> {
    // TODO return error if ServerEnvironment.api_based is false: not allowed
    return this.httpClient.post(
      ServerEnvironment.base_uri + 'media', data, this.httpOptions)
      .pipe(
        map(url => {
          console.log("Successfull pushed media to server");
          return url["url"];
        }),
        catchError(error => {
          console.log("Failure while pushing media to server");
          return error;
        })
      );
  }

  /**
   * Delete chase with given id from configured data source.
   */
  public deleteMedia(id: string): Observable<any> {
    return this.httpClient.delete(
      ServerEnvironment.base_uri + 'media/' + id, this.httpOptions)
      .pipe(
        map(chase => {
          console.log("Successfull deleted media");
          return chase;
        }),
        catchError(error => {
          console.log("Failure while deleting media");
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
