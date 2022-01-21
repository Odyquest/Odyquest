import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaseService, ChaseServiceMock } from 'chase-services';
import { MetaDataEditorComponent } from './meta-data-editor.component';

describe('MetaDataEditorComponent', () => {
  let component: MetaDataEditorComponent;
  let fixture: ComponentFixture<MetaDataEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetaDataEditorComponent ],
      providers: [
        {
          provide: ChaseService,
          useClass: ChaseServiceMock
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaDataEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
