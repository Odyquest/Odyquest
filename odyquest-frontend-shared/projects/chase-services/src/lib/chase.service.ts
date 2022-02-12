import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { OAuthStorage } from 'angular-oauth2-oidc';

import { Chase, ChaseList, Media, MediaContainer, Image } from 'chase-model';
import { deserialize, serialize } from 'typescript-json-serializer';
import { RuntimeConfigurationService } from './runtime-configuration.service';

export abstract class AbstractChaseService {
  public abstract getAllChases(addProtected: boolean): Observable<any>;

  public abstract getChase(id: string): Observable<any>;

  public abstract createOrUpdateChase(chase: Chase): Observable<any>;

  public abstract deleteChase(id: string): Observable<any>;

  public abstract getMedia(chaseId: string, mediaId: string): Observable<any>;

  public abstract createOrUpdateMedia(medi: Media): Observable<any>;

  public abstract deleteMedia(chaseId: string, mediaId: string): Observable<any>;

  public abstract createMediaFile(chaseId: string, mediaId: string, file: File): Observable<any>;

  public abstract deleteMediaFile(chaseId: string, mediaId: string, filename: string): Observable<any>;
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
  private protectedAccess = false;

  constructor(
    private httpClient: HttpClient,
    private configuration: RuntimeConfigurationService,
    private authStorage: OAuthStorage,
  ) { }

  private getHttpOptions(): any {
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authStorage.getItem('access_token')
      })
    };
  }

  /**
   * Set access for protected data
   *
   * Needs authentication for access.
   */
  public setProtectedAccess(): void {
    this.protectedAccess = true;
  }

  /**
   * Get list of ChaseMetaData from configured data source.
   *
   * @return observable of type ChaseList
   */
  public getAllChases(): Observable<ChaseList> {
    return this.httpClient.get(this.getChaseListPath(), this.getHttpOptions())
      .pipe(
        map(chases => {
          return deserialize<ChaseList>(chases, ChaseList);
        }),
        catchError(error => {
          console.error('Error reading chase list from server');
          return of(new ChaseList());
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
          console.log('Success');
          return deserialize<Chase>(chase, Chase);
        }),
        catchError(error => {
          console.log('Failure');
          return error;
        })
      );
  }

  /**
   * Create chase in data source
   *
   * @return observable containing chaseId
   */
  public createOrUpdateChase(chase: Chase): Observable<string> {
    // TODO return error if 'api_based' is false: not allowed
    return this.httpClient.post(
      this.configuration.getApiBaseUri() + 'protected/chase', serialize(chase), this.getHttpOptions())
      .pipe(
        map(chaseId => {
          console.log('Successfull pushed chase to server');
          return chaseId['chaseId'];
        }),
        catchError(error => {
          console.log('Failure while pushing chase to server');
          return error;
        })
      );
  }

  /**
   * Delete chase with given id from configured data source.
   */
  public deleteChase(id: string): Observable<any> {
    return this.httpClient.delete(this.getChasePath(id), this.getHttpOptions())
      .pipe(
        map(chase => {
          console.log('Successfull deleted chase');
          return chase;
        }),
        catchError(error => {
          console.log('Failure while deleting chase');
          return error;
        })
      );
  }

  public getMedia(chaseId: string, mediaId: string): Observable<Media> {
    return this.httpClient.get(this.getMediaPath(chaseId, mediaId), this.getHttpOptions())
      .pipe(
        map(media => {
          return this.deserializeMedia(media);
        }),
        catchError(error => {
          console.error('Error while reading media from server');
          return of(new Image());
        })
      );
  }

  public createOrUpdateMedia(media: Media): Observable<string> {
    const container = new MediaContainer(media);
    return this.httpClient.post(
      this.configuration.getApiBaseUri() + 'protected/media', serialize(container), this.getHttpOptions())
      .pipe(
        map(mediaId => {
          console.log('Successfull pushed media to server');
          return mediaId['mediaId'];
        }),
        catchError(error => {
          console.error('Failure while pushing media to server');
          return '';
        })
      );
  }

  public deleteMedia(chaseId: string, mediaId: string): Observable<any> {
    return this.httpClient.delete(this.getMediaPath(chaseId, mediaId), this.getHttpOptions())
      .pipe(
        map(chase => {
          console.log('Successfull deleted chase');
          return chase;
        }),
        catchError(error => {
          console.error('Failure while deleting chase');
          return error;
        })
      );
  }

  /**
   * Create media file in data source
   *
   * @return observable containing url to data relative to 'base_uri'
   */
  public createMediaFile(chaseId: string, mediaId: string, file: File): Observable<Media> {
    const form = new FormData();
    form.append('file', file);
    form.append('chaseId', chaseId);
    form.append('mediaId', mediaId);
    console.log('create media ' + mediaId);
    return this.httpClient.post(
      this.configuration.getApiBaseUri() + 'protected/file', form, this.getHttpOptions())
      .pipe(
        map(media => {
          console.log('Successfull pushed media file to server:');
          return this.deserializeMedia(media);
        }),
        catchError(error => {
          // if (error.status === 200) {
          //   // This should not be an error, handle it like success
          //   console.log('Pushed media to server');
          //   return of(this.configuration.getApiBaseUri() + error.error.text);
          // } else {
            console.log('Failure while pushing media to server');
            console.log(error);
            return of(new Image());
          // }
        })
      );
  }

  /**
   * Delete chase with given id from configured data source.
   */
  public deleteMediaFile(chaseId: string, mediaId: string, filename: string): Observable<any> {
    return this.httpClient.delete(
      this.configuration.getApiBaseUri() + 'protected/file/' + chaseId + '/' + mediaId, this.getHttpOptions())
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

  private getChaseListPath(): string {
    let prefix = '';
    if (this.protectedAccess) {
      prefix = 'protected/';
    }
    if (this.configuration.isApiBased() === true) {
      return this.configuration.getApiBaseUri() + prefix + 'chase';
    } else {
      return this.configuration.getApiBaseUri() + 'chase-list.json';
    }
  }

  private getChasePath(id: string): string {
    // TODO check if user is logged in -> use 'protected' prefix
    if (this.configuration.isApiBased() === true) {
      let prefix = '';
      if (this.protectedAccess) {
        prefix = 'protected/';
      }
      return this.configuration.getApiBaseUri() + prefix + 'chase/' + id;
    } else {
      return this.configuration.getApiBaseUri() + id + '/chase.json';
    }
  }

  private getMediaPath(chaseId: string, mediaId: string): string {
    // TODO check if user is logged in -> use 'protected' prefix
    if (this.configuration.isApiBased() === true) {
      let prefix = '';
      if (this.protectedAccess) {
        prefix = 'protected/';
      }
      return this.configuration.getApiBaseUri() + prefix + 'media/' + chaseId + '/' + mediaId;
    } else {
      console.error('There is no separete media file (necessary) in static data set.');
      return this.configuration.getApiBaseUri() + 'media/' + chaseId + '/' + mediaId;
    }
  }

  private deserializeMedia(data: any): Media {
    return deserialize<MediaContainer>(data, MediaContainer).get();
  }

}
