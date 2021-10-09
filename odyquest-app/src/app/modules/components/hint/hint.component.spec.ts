import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProvideHelpComponent } from './provide-help.component';

describe('ProvideHelpComponent', () => {
  let component: ProvideHelpComponent;
  let fixture: ComponentFixture<ProvideHelpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvideHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvideHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
