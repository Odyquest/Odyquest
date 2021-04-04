import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UiService {

  toolbarTitle = new BehaviorSubject<string>('Odyquest');

  constructor() { }
}
