import { Component, OnInit, Input } from '@angular/core';
import { ChaseService } from "./../services/chase.service"
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  inputUrl: boolean;
  chases;

  subscritptions = new Array<Subscription>();

  constructor(private chaseService: ChaseService) { }

  ngOnInit(): void {
    this.chaseService.chases.subscribe(chases => {
      this.chases = chases;
      console.log('CHASES: ', this.chases);
    })
  }

  onInputUrl(): void {
    console.log('input url called');
    this.inputUrl = true;
  }

  public getAllChases() {
    this.chaseService.getAllChases().subscribe(chases => this.chaseService.chases.next(chases))
  }

  ngOnDestroy() {
    this.subscritptions.forEach(subscription => subscription.unsubscribe())
  }
}

