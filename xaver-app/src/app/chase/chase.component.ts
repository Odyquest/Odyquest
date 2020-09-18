import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Chase } from '../chase';
import { QuestService } from '../services/quest.service';

@Component({
  selector: 'app-chase',
  templateUrl: './chase.component.html',
  styleUrls: ['./chase.component.scss']
})
export class ChaseComponent implements OnInit {
  chase: Chase;

  constructor(private activatedRoute: ActivatedRoute, public questService: QuestService) {
    console.log('data?', this.activatedRoute.snapshot.data.chase);
    this.chase = this.activatedRoute.snapshot.data.chase;
  }

  ngOnInit(): void {

    // this.chase.quests.forEach(quest =>


    //   // console.log('quest: ', this.questService.getQuestById(Object.keys(quest)[0]))

    // );
    console.log('quest: ', this.questService.getQuestById("00000000-0000-0000-0000-000000000004").subscribe(quest => (console.log('lol?', quest))))

  }

  getNextQuest(quest) {
    Object.keys(quest)
    // this.questService.getQuestById()

  }

}
