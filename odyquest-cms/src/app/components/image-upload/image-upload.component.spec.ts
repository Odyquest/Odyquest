import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

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
      imports: [ 
        MatDialogModule,
        MatMenuModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
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
    component.mediaId = 'media_id';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
