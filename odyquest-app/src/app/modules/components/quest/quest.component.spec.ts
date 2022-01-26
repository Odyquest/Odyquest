import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Chase, Quest } from 'chase-model';
import { GameService } from 'src/app/core/services/game.service';
import { QuestComponent } from './quest.component';

describe('QuestComponent', () => {
  let component: QuestComponent;
  let fixture: ComponentFixture<QuestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestComponent ],
      imports: [ MatDialogModule ],
       providers: [
         { provide: MAT_DIALOG_DATA, useValue: {} },
         { provide: GameService, useValue: { chase: new Chase()} }
       ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestComponent);
    component = fixture.componentInstance;
    component.quest = new Quest();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
