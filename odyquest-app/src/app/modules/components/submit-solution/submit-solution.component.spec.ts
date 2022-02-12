import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Quest } from 'chase-model';
import { SubmitSolutionComponent } from './submit-solution.component';

describe('SubmitSolutionComponent', () => {
  let component: SubmitSolutionComponent;
  let fixture: ComponentFixture<SubmitSolutionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitSolutionComponent ],
      imports: [ MatDialogModule ],
       providers: [
         { provide: MatDialogRef, useValue: {} },
         { provide: MAT_DIALOG_DATA, useValue: { quest: new Quest() } }
       ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
