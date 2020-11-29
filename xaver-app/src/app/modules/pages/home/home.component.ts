import { UiService } from './../../../core/services/ui.service';
import { Component, OnInit, Input } from '@angular/core';
import { ChaseService } from 'src/app/shared/services/chase.service';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { deserialize } from 'typescript-json-serializer';

import { ChaseList } from './../../../shared/models/chase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  inputUrl: boolean;
  chases;
  chaseList = new ChaseList();
  loading = false;

  subscritptions = new Array<Subscription>();

  constructor(private chaseService: ChaseService, private router: Router, private uiService: UiService) { }

  ngOnInit(): void {
    // this.chaseService.chases.subscribe(chases => {
    //   this.chases = chases;
    //   console.log('CHASES: ', this.chases);
    // })
    this.uiService.toolbarTitle.next("Wähle eine Schnitzeljagd")
    this.chaseService.getAllChases().subscribe(chases => this.chaseList = deserialize<ChaseList>(chases, ChaseList));
  }

  onInputUrl(): void {
    console.log('input url called');
    this.inputUrl = true;
  }

  public startChase(id: string): void {
    this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.router.navigateByUrl('/chase?id=' + id);
      }, 1500);
  

  }

  ngOnDestroy() {
    this.subscritptions.forEach(subscription => subscription.unsubscribe())
  }
}

