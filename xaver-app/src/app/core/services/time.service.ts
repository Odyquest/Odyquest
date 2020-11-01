import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {Subject} from 'rxjs';


@Injectable({providedIn: 'root'})
export class TimeService {
  exampleTimer = new Subject<any>();
  constructor() {}

  setTimer(hours: number, minutes: number, seconds: number) {
    const futureDate = moment()
                           .add(hours, 'hours')
                           .add(minutes, 'minutes')
                           .add(seconds, 'seconds');
    this.exampleTimer.next(futureDate);
    console.log('futureDate', futureDate);
  }
}
