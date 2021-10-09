import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoggedOutComponent } from './logged-out.component';

describe('LoggedOutComponent', () => {
  let component: LoggedOutComponent;
  let fixture: ComponentFixture<LoggedOutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
