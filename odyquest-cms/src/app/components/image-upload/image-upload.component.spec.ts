import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Image } from 'chase-model';
import { ChaseService, ChaseServiceMock } from 'chase-services';
import { RuntimeConfigurationService, RuntimeConfigurationServiceMock } from 'chase-services';

import { ImageUploadComponent } from './image-upload.component';

describe('ImageUploadComponent', () => {
  let component: ImageUploadComponent;
  let fixture: ComponentFixture<ImageUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageUploadComponent ],
      providers: [
        {
          provide: RuntimeConfigurationService,
          useClass: RuntimeConfigurationServiceMock
        },
        {
          provide: ChaseService,
          useClass: ChaseServiceMock
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploadComponent);
    component = fixture.componentInstance;
    component.image = new Image();
    component.chaseId = 'chase_id';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
