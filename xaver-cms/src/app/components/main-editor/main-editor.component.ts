import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Chase, ChaseMetaData } from 'src/app/shared/models/chase';
import { deserialize, serialize } from 'typescript-json-serializer';

import { ChaseService } from 'src/app/shared/services/chase.service';
import { Description } from 'src/app/shared/models/description';
import { GameElement } from 'src/app/shared/models/gameElement';
import { Narrative } from 'src/app/shared/models/narrative';
import { Quest } from 'src/app/shared/models/quest';
import { SELECT_PANEL_INDENT_PADDING_X } from '@angular/material/select';
import { saveAs } from 'file-saver';

@Component({
  selector: 'main-chase-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.scss'],
})
export class MainEditorComponent implements OnInit, AfterViewInit {
  public chase: Chase;
  selectedQuest: number;
  chaseID = 'julia'; //{"xaver", "julia", "silke"}
  title: string = '';
  author: string = '';
  description: string = '';

  gameElementsMap = new Map<number, string>();
  gameElementsList = [];

  image_url: string =
    'https://i.pinimg.com/originals/26/54/2c/26542cc0d5852f423f96a3728813391e.png';

  @ViewChild('quest_editor') questEditor;

  // these values are filled with info from the chase
  // todo use actual questList
  questList: string[];
  narrativeList: string[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private chaseService: ChaseService
  ) {
    this.chaseID = this.activatedRoute.snapshot.queryParams.id;
  }

  ngOnInit(): void {
    console.log('ngOnInit()');
    this.chaseService.getChase(this.chaseID).subscribe((chase) => {
      this.chase = deserialize<Chase>(chase, Chase);
      // this.createNewChase();

      this.getDataFromChase();
      this.questEditor.setGameElementToEdit(
        this.chase.gameElements.get(this.selectedQuest),
        true
      );
      this.questEditor.setChase(this.chase);
    });
  }

  writeDataToChase(): void {
    this.chase.metaData.title = this.title;
    this.chase.metaData.description = this.description;
    this.chase.metaData.author = this.author;
  }

  // reads all the info from this.chase and writes onto class members
  getDataFromChase(): void {
    this.selectedQuest = 1; //todo change again

    this.title = this.chase.metaData.title;
    this.description = this.chase.metaData.description;
    this.author = this.chase.metaData.author;

    //console.log("Selected Quest Id: " + this.selectedQuest);
    //console.log("Loading values from Chase", this.chase.metaData.title);

    //write questList string
    console.log(
      'Contained GameElements (' + this.chase.gameElements.size + '):'
    );
    this.questList = [];
    this.narrativeList = [];

    this.chase.gameElements.forEach((value: GameElement, key: Number) => {
      let title_with_id = value.title + ' (' + key + ')';
      if (value instanceof Quest) {
        console.log('Quest:' + title_with_id);
        this.questList.push(title_with_id);
      } else if (value instanceof Narrative) {
        console.log('Narrative:' + title_with_id);
        this.narrativeList.push(title_with_id);
      }
    });

    this.gameElementsMap = new Map<number, string>();
    this.gameElementsList = [];

    this.chase.gameElements.forEach((value: GameElement, key: number) => {
      let title_with_id = value.title + ' (' + key + ')';
      console.log('Key', key, 'GameElement' + title_with_id);
      this.gameElementsMap.set(key, title_with_id);
      this.gameElementsList.push(title_with_id);
    });

    console.log('GameElementsList length:', this.gameElementsList.length);
    this.gameElementsList.forEach(function (value) {
      console.log(value);
    });
  }

  // forwards the selected quest to the QuestEditorComponent
  selectQuestByNumber(itemID: number): void {}

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit()');
  }

  // selectQuestByName(value: String) {
  //   console.log(value)
  // }

  static parseIdFromGEString(text: string): number {
    let id_text = text.substr(text.lastIndexOf('(') + 1); //)
    id_text = id_text.substr(0, id_text.length - 1);

    return +id_text;
  }

  questSelectorClicked(text: string) {
    console.log('Quest Selector Clicked', text);

    //parse id from name, not so pretty a solution TBH
    this.selectedQuest = MainEditorComponent.parseIdFromGEString(text);
    this.questEditor.setGameElementToEdit(
      this.chase.gameElements.get(this.selectedQuest),
      false
    );
    this.questEditor.setChase(this.chase);
  }

  deleteGameElement(text: string) {
    let delete_index = MainEditorComponent.parseIdFromGEString(text);
    this.chase.gameElements.delete(delete_index);
    console.log('deleted GameElement:', text);

    //todo reload component?
    this.getDataFromChase();
  }

  deleteChase() {
    console.log('Lösche Chase mit ID: ', this.chaseID);
    this.chaseService.deleteChase(this.chaseID);
  }

  addQuest() {
    console.log('addQuest()');

    const quest = new Quest();
    quest.title = 'Neues Rätsel';
    this.chase.gameElements.set(this.getNextFreeMapKey(), quest);

    this.getDataFromChase();
  }

  addNarrative() {
    console.log('addNarrative()');

    const narrative = new Narrative();
    narrative.title = 'New Narrative';
    this.chase.gameElements.set(this.getNextFreeMapKey(), narrative);

    this.getDataFromChase();
  }

  getNextFreeMapKey(): number {
    let key = 1;

    while (true) {
      if (!this.chase.gameElements.has(key)) {
        console.log('Found next free key: ', key);
        return key;
      }
      key++;
    }
  }

  parseIdFromGEString(text: string): number {
    let id_text = text.substr(text.lastIndexOf('(') + 1); //)
    id_text = id_text.substr(0, id_text.length - 1);

    return +id_text;
  }

  onInitialGameElementChange(value: string) {
    this.chase.initialGameElement = this.parseIdFromGEString(value);
    console.log('Set initial game element to ' + this.chase.initialGameElement);
  }

  createNewChase(): void {
    console.log('TITLE: ' + this.title);
    console.log('Description: ' + this.description);
    console.log('Author: ' + this.author);

    console.log('Creating new Chase from scratch...');

    this.chase = new Chase();
    this.chase.gameElements = new Map();
    this.chase.metaData = new ChaseMetaData();
    this.addQuest();

    this.getDataFromChase();
    this.questEditor.setGameElementToEdit(this.chase.gameElements.get(1), true);
    this.questEditor.setChase(this.chase);
  }

  uploadChase($event): void {
    console.log('Opening file explorer to load local chase file...');

    console.log($event.target.files[0]);
    var reader = new FileReader();
    reader.addEventListener('load', (e) => {
      const json_string: string = reader.result as string;
      var json = JSON.parse(json_string);
      var chase = deserialize<Chase>(json, Chase);
      console.log(chase);

      this.chase = chase;

      this.selectedQuest = 1;

      this.getDataFromChase();
      this.questEditor.setGameElementToEdit(
        this.chase.gameElements.get(this.selectedQuest),
        true
      );
      this.questEditor.setChase(this.chase);
    });
    reader.readAsText($event.target.files[0]);
  }

  prepareSavingChase(): void {
    this.questEditor.localToGameElement();
    this.writeDataToChase();
  }

  pushChase(): void {
    console.log('Push chase to server!');
    this.prepareSavingChase();
    // push chase to server database
    this.chaseService.createOrUpdateChase(this.chase).subscribe((id) => {
      this.chase.metaData.chaseId = id;
    });
  }

  downloadChase(): void {
    console.log('Provide Chase as Download...');
    this.prepareSavingChase();

    const serialized = serialize(this.chase, true);
    const json = JSON.stringify(serialized, null, 2);

    const blob = new Blob([json], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'chase.json');
  }

  uploadMedia($event): void {
    console.log('Opening file explorer to load local media file...');
    console.log($event.target.files[0]);
    const reader = new FileReader();
    reader.addEventListener('load', (e) => {
      console.log('upload file...');
      this.chaseService
        .createMedia(
          this.chase.metaData.chaseId,
          '(unnamed)',
          $event.target.files[0]
        )
        .subscribe((res) => {
          console.log('...done: ' + res);
          this.image_url = res;
          // update image and url fields
        });
    });
    reader.readAsArrayBuffer($event.target.files[0]);
  }
}
