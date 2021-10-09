import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateChaseDialogComponent } from './create-chase-dialog.component';

describe('CreateChaseDialogComponent', () => {
  let component: CreateChaseDialogComponent;
  let fixture: ComponentFixture<CreateChaseDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateChaseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
