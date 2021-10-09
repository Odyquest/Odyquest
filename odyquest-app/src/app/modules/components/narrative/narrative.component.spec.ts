import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NarrativeComponent } from './narrative.component';

describe('NarrativeComponent', () => {
  let component: NarrativeComponent;
  let fixture: ComponentFixture<NarrativeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NarrativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NarrativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
