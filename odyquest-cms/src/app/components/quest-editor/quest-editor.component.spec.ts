import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChaseEditorService } from 'src/app/services/chase-editor.service';
import { QuestEditorComponent } from './quest-editor.component';

describe('QuestEditorComponent', () => {
  let component: QuestEditorComponent;
  let fixture: ComponentFixture<QuestEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestEditorComponent ],
      providers: [ ChaseEditorService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
