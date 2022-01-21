import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Chase } from 'chase-model';
import { ChaseService, ChaseServiceMock } from 'chase-services';
import { ChaseStorageService, ChaseStorageServiceMock } from 'chase-services';
import { RuntimeConfigurationService, RuntimeConfigurationServiceMock } from 'chase-services';
import { MainEditorComponent } from './main-editor.component';

describe('MainEditorComponent', () => {
  let component: MainEditorComponent;
  let fixture: ComponentFixture<MainEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ MainEditorComponent ],
      providers: [
        {
          provide: RuntimeConfigurationService,
          useClass: RuntimeConfigurationServiceMock
        },
        {
          provide: ChaseStorageService,
          useClass: ChaseStorageServiceMock
        },
        {
          provide: ChaseService,
          useClass: ChaseServiceMock
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainEditorComponent);
    component = fixture.componentInstance;
    // FIXME should not be necessary
    component.chase = new Chase();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
