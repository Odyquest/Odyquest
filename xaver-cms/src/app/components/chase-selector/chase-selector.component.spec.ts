import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChaseSelectorComponent } from './chase-selector.component';

describe('ChaseSelectorComponent', () => {
  let component: ChaseSelectorComponent;
  let fixture: ComponentFixture<ChaseSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChaseSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaseSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
