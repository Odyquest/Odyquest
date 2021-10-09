import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChaseListComponent } from './chase-list.component';

describe('ChaseListComponent', () => {
  let component: ChaseListComponent;
  let fixture: ComponentFixture<ChaseListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChaseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
