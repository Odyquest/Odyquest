import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { deserialize, serialize } from 'typescript-json-serializer';
import { HostListener } from '@angular/core';
import { Observable } from 'rxjs';

import { UiService } from './../../../core/services/ui.service';
import { ChaseService } from 'chase-services';
import { ChaseStorageService } from 'chase-services';
import { ChaseStatus } from 'chase-model';
import { CloseWarningGuard } from 'src/app/core/services/close-warning.guard';
import { GameService, QuestStatus } from '../../../core/services/game.service';
import { GameElement } from 'chase-model';
import { Description } from 'chase-model';
import { Narrative } from 'chase-model';
import { Quest } from 'chase-model';
import { Chase } from 'chase-model';

import { getSimpleExample } from 'chase-model';

@Component({
  selector: 'app-chase',
  templateUrl: './chase.component.html',
  styleUrls: ['./chase.component.scss']
})
export class ChaseComponent implements OnInit {
  chaseID: string | undefined;
  game: GameService;
  displayElement: GameElement;
  isFinalElement = false;

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return this.game.isFinished();
  }

  constructor(private activatedRoute: ActivatedRoute,
              private chaseService: ChaseService,
              private router: Router,
              private uiService: UiService,
              private chaseStorage: ChaseStorageService) {
    this.chaseID = this.activatedRoute.snapshot.queryParams.id;
    // FIXME try remove display simple example as default
    this.displayElement = getSimpleExample().gameElements[getSimpleExample().initialGameElement];
  }

  start_game(chase: Chase): void {
    console.log('start new game: ' + chase.metaData.title);
    this.game = new GameService(this.chaseStorage, chase);
    this.displayElement = this.game.start();
    this.uiService.toolbarTitle.next(this.game.chase.metaData.title);
  }

  ngOnInit(): void {
    if (!this.chaseID && this.chaseStorage.hasRunningChase()) {
      this.game = GameService.fromStorage(this.chaseStorage);
      this.displayElement = this.game.start();
      this.uiService.toolbarTitle.next(this.game.chase.metaData.title);
    } else {
      this.chaseService.getChase(this.chaseID).subscribe(chase => (this.start_game(chase)));
    }
  }

  selectDestination(destination: number): void {
    this.displayElement = this.game.continueWith(destination);
    // navigate to top for next element
    document.getElementById('router').scrollTo(0, 0);
    console.log('Select next element "' + this.displayElement.title + '" (' + destination + ')');
  }

  setChaseStatus(chaseStatus: ChaseStatus): void {
    console.log('Set chase status to ' + chaseStatus);
    if (chaseStatus === ChaseStatus.Succeeded || chaseStatus === ChaseStatus.Failed) {
      this.game.finish(chaseStatus);
      setTimeout(() => { this.router.navigateByUrl('/finished?status=' + chaseStatus); }, 1500);
    }
  }

  isNarrative(element: GameElement): boolean {
    return element instanceof Narrative;
  }

  isQuest(element: GameElement): boolean {
    return element instanceof Quest;
  }

}
