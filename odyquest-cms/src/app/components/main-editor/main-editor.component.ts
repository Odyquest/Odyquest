import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { deserialize, serialize } from 'typescript-json-serializer';
import { saveAs } from 'file-saver';

import { ChaseService } from 'chase-services';
import { ChaseStorageService } from 'chase-services';
import { RuntimeConfigurationService } from 'chase-services';
import { GameElement } from 'chase-model';
import { Narrative } from 'chase-model';
import { Quest } from 'chase-model';
import { Chase } from 'chase-model';

import { ChaseEditorService } from 'src/app/services/chase-editor.service';

@Component({
  selector: 'main-chase-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.scss'],
})
export class MainEditorComponent implements OnInit, AfterViewInit {
  selectedQuest: number;
  chaseID: string;
  editorAction: string;

  @ViewChild('element_editor') elementEditor;

  constructor(
    private activatedRoute: ActivatedRoute,
    private configuration: RuntimeConfigurationService,
    private chaseService: ChaseService,
    private chaseStorage: ChaseStorageService,
    private location: Location,
    public chaseEditor: ChaseEditorService
  ) {
    this.chaseID = this.activatedRoute.snapshot.queryParams.id;
    this.editorAction = this.activatedRoute.snapshot.queryParams.action;
  }

  ngOnInit(): void {
    if (this.chaseID) {
      console.log('load chase from given id');
      this.chaseService.getChase(this.chaseID).subscribe((chase) => {
        this.chaseEditor.setChase(chase);
        this.loadDataFromChase();
      });
    } else {
      console.log('create new chase');
      this.createNewChase();
    }
  }

  // reads all the info from this.chaseEditor.getChase() and writes onto class members
  loadDataFromChase(): void {
    this.selectedQuest = 1; // todo change again
    if (this.elementEditor) {
      this.elementEditor.reloadChase();
      this.elementEditor.setMetaDataToEdit();
    }
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit()');
  }

  metaDataSelectorClicked() {
    if (this.elementEditor) {
      // this.elementEditor.reloadChase();
      this.elementEditor.setMetaDataToEdit();
    }
  }

  questSelectorClicked(text: string) {
    console.log('Quest Selector Clicked', text);

    // parse id from name, not so pretty a solution TBH
    this.selectedQuest = this.chaseEditor.getElementIdByName(text);
    if (this.elementEditor) {
      // this.elementEditor.reloadChase();
      this.elementEditor.setGameElementToEdit(
        this.chaseEditor.getChase().gameElements.get(this.selectedQuest)
      );
    }
  }

  deleteGameElement(text: string) {
    const index = this.chaseEditor.getElementIdByName(text);
    this.chaseEditor.getChase().gameElements.delete(index);
    console.log('deleted GameElement:', text);

    this.loadDataFromChase();
  }

  deleteChase() {
    console.log('Lösche Chase mit ID: ', this.chaseID);
    this.chaseService.deleteChase(this.chaseID);
    // FIXME navigate to list?
  }

  addQuest() {
    console.log('addQuest()');
    const quest = new Quest();
    quest.title = 'Neues Rätsel'; // FIXME set localized string
    this.addGameElement(quest);
  }

  addNarrative() {
    console.log('addNarrative()');
    const narrative = new Narrative();
    narrative.title = 'Neues Erzählelement'; // FIXME set localized string
    this.addGameElement(narrative);
  }

  addGameElement(element: GameElement) {
    const id = this.chaseEditor.addGameElement(element);
    this.loadDataFromChase();

    // jump to new element
    this.questSelectorClicked(this.chaseEditor.getElementNameById(id));
  }

  uploadChase($event): void {
    console.log('Opening file explorer to load local chase file...');

    console.log($event.target.files[0]);
    const reader = new FileReader();
    reader.addEventListener('load', (e) => {
      const jsonString: string = reader.result as string;
      const json = JSON.parse(jsonString);
      const chase = deserialize<Chase>(json, Chase);
      console.log(chase);

      this.chaseEditor.setChase(chase);
      this.loadDataFromChase();
    });
    reader.readAsText($event.target.files[0]);
  }

  prepareSavingChase(): void {
    if (this.elementEditor) {
      this.elementEditor.saveGameElementChangesToChase();
      this.elementEditor.saveMetaDataChangesToChase();
    }
  }

  pushChase(): void {
    console.log('Push chase to server!');
    this.prepareSavingChase();
    // push chase to server database
    this.chaseService.createOrUpdateChase(this.chaseEditor.getChase()).subscribe((id) => {
      this.chaseEditor.getChase().metaData.chaseId = id;
    });
    this.chaseEditor.notifySaved();
  }

  downloadChase(): void {
    console.log('Provide Chase as Download...');
    this.prepareSavingChase();

    const serialized = serialize(this.chaseEditor.getChase(), true);
    const json = JSON.stringify(serialized, null, 2);

    const blob = new Blob([json], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'chase.json');
    if (!this.hasModifiableApi()) {
      this.chaseEditor.notifySaved();
    }
  }

  public tryInApp() {
    this.prepareSavingChase();
    this.chaseStorage.setRunningChase(this.chaseEditor.getChase());
    this.chaseStorage.setCurrentPosition(this.selectedQuest);
    window.open('/app/de/chase?id=', '_blank');
  }

  hasModifiableApi(): boolean {
    return this.configuration.isApiBased();
  }

  createNewChase(): void {
    // TODO check for unsaved changes
    const chase = new Chase();
    this.chaseEditor.setChase(chase);
    this.addQuest();
    this.loadDataFromChase();
    this.pushChase();
    this.location.go('/editor?id=' + this.chaseEditor.getChaseId());
  }
}
