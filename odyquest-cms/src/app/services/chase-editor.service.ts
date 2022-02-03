import { Injectable } from '@angular/core';

import { Chase, GameElement, Image, Narrative, Quest } from 'chase-model';

@Injectable({
  providedIn: 'root'
})
export class ChaseEditorService {
  private chase = new Chase();

  private gameElementNameMap: Map<number, string>;
  private gameElementNameList: string[];
  private narrativeNames: string[];
  private questNames: string[];

  constructor() {
    this.initElementNames();
  }

  private initElementNames(): void {
    this.gameElementNameMap = new Map<number, string>();
    this.gameElementNameList = [];
    this.questNames = [];
    this.narrativeNames = [];

    console.log('Contained GameElements (' + this.chase.gameElements.size + '):');

    this.chase.gameElements.forEach((value: GameElement, key: number) => {
      const titleWithId = value.title + ' (' + key + ')';
      this.gameElementNameMap.set(key, titleWithId);
      this.gameElementNameList.push(titleWithId);
      if (value instanceof Quest) {
        console.log('Quest:' + titleWithId);
        this.questNames.push(titleWithId);
      } else if (value instanceof Narrative) {
        console.log('Narrative:' + titleWithId);
        this.narrativeNames.push(titleWithId);
      }
    });
  }

  public setChase(chase: Chase): void {
    this.chase = chase;
    this.initElementNames();
  }

  public getChase(): Chase {
    return this.chase;
  }

  public getElementIdByName(name: string): number {
    let idText = name.substr(name.lastIndexOf('(') + 1);
    idText = idText.substr(0, idText.length - 1);
    return +idText;
  }

  public getElementNameById(id: number) {
    return this.gameElementNameMap.get(id);
  }

  public getElementNames(): string[] {
    return this.gameElementNameList;
  }

  public addGameElement(element: GameElement): number {
    const id = this.getFreeElementId();
    this.chase.gameElements.set(id, element);
    this.initElementNames();
    return id;
  }

  private getFreeElementId(): number {
    let id = 1;
    while (true) {
      if (!this.chase.gameElements.has(id)) {
        return id;
      }
      id++;
    }
  }

  public getNarrativeNames(): string[] {
    return this.narrativeNames;
  }

  public getQuestNames(): string[] {
    return this.questNames;
  }

  public hasChaseId(): boolean {
    if (this.chase && this.chase.metaData.chaseId) {
      return true;
    } else {
      return false;
    }
  }

  public getChaseId(): string {
    if (this.chase && this.chase.metaData.chaseId) {
      return this.chase.metaData.chaseId;
    } else {
      return '';
    }
  }

  public getImage(id: string): Image {
    return this.chase.getMedia<Image>(id) || new Image();
  }
  public setImage(id: string, image: Image): void {
    this.chase.media.set(id, image);
  }

  public notifyElementChanged(): void {
    // TODO
  }

  public notifyElementTitleChanged(): void {
    // TODO
    this.notifyElementChanged();
  }

  public notifySaved(): void {
    // TODO
  }
}
