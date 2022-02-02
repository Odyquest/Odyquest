import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { Observable, of } from 'rxjs';

import { Chase, ChaseList, Media, Image } from 'chase-model';

import { ChaseService } from './chase.service';
import { AbstractChaseService } from './chase.service';

@Injectable({
  providedIn: 'root'
})
export class ChaseServiceMock implements AbstractChaseService {

  constructor(
  ) {
  }

  public getAllChases(addProtected = false): Observable<any> {
    const list = new ChaseList();
    return of(list);
  }

  public getChase(id: string): Observable<any> {
    const chase = new Chase();
    return of(chase);
  }

  public createOrUpdateChase(chase: Chase): Observable<any> {
    return of({ chaseId: 'chase_id' });
  }

  public deleteChase(id: string): Observable<any> {
    return of({ status: 'success' });
  }

  public getMedia(chaseId: string, mediaId: string): Observable<any> {
    const media = new Image();
    return of(media);
  }

  public createOrUpdateMedia(media: Media): Observable<any> {
    return of({ media_id: 'media_id' });
  }

  public deleteMedia(chaseId: string, mediaId: string): Observable<any> {
    return of('success');
  }

  public createMediaFile(chaseId: string, mediaId: string, file: File): Observable<any> {
    return of(new Image());
  }

  public deleteMediaFile(chaseId: string, mediaId: string, filename: string): Observable<any> {
    return of('success');
  }
}
