import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChaseService } from './chase.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChaseResolverService implements Resolve<any> {

  constructor(private http: HttpClient, private chaseService: ChaseService) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<any> | Promise<any> {
    return this.http.get(this.chaseService.SERVER_BASE_URI + "/00000000-0000-0000-0000-000000000000").pipe(map(response => {
      console.log('response', response);
      return response; //removed .json()
    }))
  }
}
