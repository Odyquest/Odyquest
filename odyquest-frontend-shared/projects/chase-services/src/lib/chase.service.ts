import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { OAuthStorage } from 'angular-oauth2-oidc';

import { Chase, ChaseList } from 'chase-model';
import { deserialize, serialize } from 'typescript-json-serializer';
import { RuntimeConfigurationService } from './runtime-configuration.service';

export abstract class AbstractChaseService {
  public abstract getAllChases(addProtected: boolean): Observable<any>;

  public abstract getChase(id: string): Observable<any>;

  public abstract createOrUpdateChase(chase: Chase): Observable<any>;

  public abstract deleteChase(id: string): Observable<any>;

  public abstract createMedia(chaseId: string, mediaId: string, file: File): Observable<any>;

  public abstract deleteMedia(id: string): Observable<any>;
}

/**
 * Connection to data source for reading and writing chases
 *
 * Actual data source is configured in RuntimeConfigurationService
 */
@Injectable({
  providedIn: 'root'
})
export class ChaseService implements AbstractChaseService {

  constructor(
    private httpClient: HttpClient,
    private configuration: RuntimeConfigurationService,
    private authStorage: OAuthStorage,
  ) { }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authStorage.getItem('access_token')
      })
    };
  }

  /**
   * Get list of ChaseMetaData from configured data source.
   *
   * @return observable of type ChaseList
   */
  public getAllChases(addProtected = false): Observable<any> {
    return this.httpClient.get(this.getChaseListPath(addProtected), this.getHttpOptions())
      .pipe(
        map(chases => {
          // console.log("chases: " + chases);
          return deserialize<ChaseList>(chases, ChaseList);
        }),
        catchError(error => {
          // console.log("error: " + JSON.stringify(error));
          return error;
        })
      );
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
          return deserialize<Chase>(chase, Chase);
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
  public createOrUpdateChase(chase: Chase): Observable<any> {
    // TODO return error if 'api_based' is false: not allowed
    return this.httpClient.post(
      this.configuration.get().api.base_uri + 'protected/chase', serialize(chase), this.getHttpOptions())
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
  public createMedia(chaseId: string, mediaId: string, file: File): Observable<any> {
    const form = new FormData();
    form.append('file', file);
    form.append('chaseId', chaseId);
    form.append('name', mediaId);
    console.log('create media ' + mediaId);
    return this.httpClient.post(
      this.configuration.get().api.base_uri + 'protected/media', form, this.getHttpOptions())
      .pipe(
        map(data => {
          console.log('Successfull pushed media to server:');
          return {
            url: this.configuration.get().api.base_uri + data['url'],
            mimetype: data['mimetype']
          };
        }),
        catchError(error => {
          if (error.status === 200) {
            // This should not be an error, handle it like success
            console.log('Pushed media to server');
            return of(this.configuration.get().api.base_uri + error.error.text);
          } else {
            console.log('Failure while pushing media to server');
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
          console.log('Successfull deleted media');
          return chase;
        }),
        catchError(error => {
          console.log('Failure while deleting media');
          return error;
        })
      );
  }

  private getChaseListPath(addProtected: boolean): string {
    let prefix = '';
    if (addProtected) {
      prefix = 'protected/';
    }
    if (this.configuration.get().api.api_based === true) {
      return this.configuration.get().api.base_uri + prefix + 'chase';
    } else {
      return this.configuration.get().api.base_uri + 'chase-list.json';
    }
  }

  private getChasePath(id: string, modify = false): string {
    // TODO check if user is logged in -> use 'protected' prefix
    if (this.configuration.get().api.api_based === true) {
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
