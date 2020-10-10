import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaseComponent } from './chase.component';

describe('ChaseComponent', () => {
  let component: ChaseComponent;
  let fixture: ComponentFixture<ChaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
