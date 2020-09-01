import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaseEditorComponent } from './chase-editor.component';

describe('ChaseEditorComponent', () => {
  let component: ChaseEditorComponent;
  let fixture: ComponentFixture<ChaseEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChaseEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaseEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
