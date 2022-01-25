import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NarrativeEditorComponent } from './narrative-editor.component';

describe('NarrativeEditorComponent', () => {
  let component: NarrativeEditorComponent;
  let fixture: ComponentFixture<NarrativeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NarrativeEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NarrativeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
