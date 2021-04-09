import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UrlInputComponent } from './url-input.component';

describe('UrlInputComponent', () => {
  let component: UrlInputComponent;
  let fixture: ComponentFixture<UrlInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
