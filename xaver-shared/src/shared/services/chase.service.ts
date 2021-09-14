import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, Subject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { OAuthStorage } from 'angular-oauth2-oidc';

import { Chase, ChaseList } from '../models/chase'
import { deserialize, serialize } from 'typescript-json-serializer';
import { RuntimeConfigurationService } from './runtime-configuration.service';

/**
 * Connection to data source for reading and writing chases
 *
 * Actual data source is configured in RuntimeConfigurationService
 */
@Injectable({
  providedIn: 'root'
})
export class ChaseService {

  constructor(
    private httpClient: HttpClient,
    private configuration: RuntimeConfigurationService,
    private authStorage: OAuthStorage,
  ) { }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authStorage.getItem('access_token')
      })
    };
  }

  /**
   * Get list of ChaseMetaData from configured data source.
   *
   * @return observable of type ChaseList
   */
  public getAllChases(): Observable<any> {
    return this.httpClient.get(this.getChaseListPath(), this.getHttpOptions())
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
    return this.httpClient.get(this.getChasePath(id), this.getHttpOptions())
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
    // TODO return error if 'api_based' is false: not allowed
    return this.httpClient.post(
      this.configuration.get().api.base_uri + 'protected/chase', serialize(p_chase), this.getHttpOptions())
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
    return this.httpClient.delete(this.getChasePath(id, true), this.getHttpOptions())
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
   * @return observable containing url to data relative to 'base_uri'
   */
  public createMedia(chaseId: string, name: string, file: File): Observable<any> {
    const form = new FormData();
    form.append('file', file);
    form.append('chaseId', chaseId);
    form.append('name', name);
    console.log('create media ' + name);
    return this.httpClient.post(
      this.configuration.get().api.base_uri + 'protected/media', form, this.getHttpOptions())
      .pipe(
        map(url => {
          console.log("Successfull pushed media to server:");
          return this.configuration.get().api.base_uri + url;
        }),
        catchError(error => {
          if (error.status === 200) {
            // This should not be an error, handle it like success
            console.log("Pushed media to server");
            return of(this.configuration.get().api.base_uri + error.error.text);
          } else {
            console.log("Failure while pushing media to server");
            console.log(error);
            return error;
          }
        })
      );
  }

  /**
   * Delete chase with given id from configured data source.
   */
  public deleteMedia(id: string): Observable<any> {
    return this.httpClient.delete(
      this.configuration.get().api.base_uri + 'protected/media/' + id, this.getHttpOptions())
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
    // TODO check if user is logged in -> use 'protected' prefix
    if (this.configuration.get().api.api_based === true) {
      return this.configuration.get().api.base_uri + 'chase';
    } else {
      return this.configuration.get().api.base_uri + 'chase-list.json';
    }
  }

  private getChasePath(id: string, modify=false): string {
    // TODO check if user is logged in -> use 'protected' prefix
    if (this.configuration.get().api_based === true) {
      let prefix = '';
      if (modify) {
        prefix = 'protected/';
      }
      return this.configuration.get().api.base_uri + prefix + 'chase/' + id;
    } else {
      return this.configuration.get().api.base_uri + id + '/chase.json';
    }
  }

}
