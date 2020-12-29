import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestService {


  readonly SERVER_ADR = 'https://localhost:';
  readonly SERVER_PORT = '8445';
  readonly QUEST_IDENTIFIER = '/api/quest'
  readonly SERVER_BASE_URI = this.SERVER_ADR + this.SERVER_PORT + this.QUEST_IDENTIFIER;

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

  public getDefaultChase(): Observable<any> {
    //console.log('call server at ' + this.SERVER_BASE_URI + "/10000000-0000-0000-0000-000000000000");
    //return this.httpClient.get(this.SERVER_BASE_URI + "/10000000-0000-0000-0000-000000000000")
    return this.httpClient.get('assets-shared/examples/chase.json')
      .pipe(
        map(chase => {
          return chase;
        }),
        catchError(error => {
          return error;
        })
      )
  }

  public getQuestById(id: string) {
    return this.httpClient.get(this.SERVER_BASE_URI + "/" + id)
      .pipe(
        map(quest => {
          console.log('questssss', quest);
          return quest;
        }),
        catchError(error => {
          return error;
        })
      )
  }

}
