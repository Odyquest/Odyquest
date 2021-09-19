import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuestEditorComponent } from './quest-editor.component';

describe('QuestEditorComponent', () => {
  let component: QuestEditorComponent;
  let fixture: ComponentFixture<QuestEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestEditorComponent ]
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
