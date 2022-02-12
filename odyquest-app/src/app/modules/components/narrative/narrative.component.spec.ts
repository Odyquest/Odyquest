import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Chase, Narrative } from 'chase-model';
import { GameService } from 'src/app/core/services/game.service';
import { NarrativeComponent } from './narrative.component';

describe('NarrativeComponent', () => {
  let component: NarrativeComponent;
  let fixture: ComponentFixture<NarrativeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NarrativeComponent ],
      imports: [ MatDialogModule ],
       providers: [
         { provide: MAT_DIALOG_DATA, useValue: {} },
         { provide: GameService, useValue: { chase: new Chase()} }
       ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NarrativeComponent);
    component = fixture.componentInstance;
    component.narrative = new Narrative();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
