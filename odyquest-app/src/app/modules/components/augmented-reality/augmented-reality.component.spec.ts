import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AugmentedReality } from 'chase-model';
import { RuntimeConfigurationService, RuntimeConfigurationServiceMock } from 'chase-services';
import { AugmentedRealityComponent } from './augmented-reality.component';

describe('AugmentedRealityComponent', () => {
  let component: AugmentedRealityComponent;
  let fixture: ComponentFixture<AugmentedRealityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AugmentedRealityComponent ],
      providers: [
        {
          provide: RuntimeConfigurationService,
          useClass: RuntimeConfigurationServiceMock
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AugmentedRealityComponent);
    component = fixture.componentInstance;
    component.ar = new AugmentedReality();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
