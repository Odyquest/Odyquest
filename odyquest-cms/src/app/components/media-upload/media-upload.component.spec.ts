import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Audio, NarrativeType } from 'chase-model';
import { ChaseService, ChaseServiceMock } from 'chase-services';
import { RuntimeConfigurationService, RuntimeConfigurationServiceMock } from 'chase-services';
import { MediaUploadComponent } from './media-upload.component';

describe('MediaUploadComponent', () => {
  let component: MediaUploadComponent;
  let fixture: ComponentFixture<MediaUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaUploadComponent ],
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
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaUploadComponent);
    component = fixture.componentInstance;
    component.media = new Audio();
    component.narrativeType = NarrativeType.Audio;
    component.chaseId = 'chase_id';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
