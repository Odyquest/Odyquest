import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaseSelectorComponent } from './chase-selector.component';

describe('ChaseSelectorComponent', () => {
  let component: ChaseSelectorComponent;
  let fixture: ComponentFixture<ChaseSelectorComponent>;

  beforeEach(async(() => {
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
