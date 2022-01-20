import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AugmentedRealityComponent } from './augmented-reality.component';

describe('AugmentedRealityComponent', () => {
  let component: AugmentedRealityComponent;
  let fixture: ComponentFixture<AugmentedRealityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AugmentedRealityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AugmentedRealityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
