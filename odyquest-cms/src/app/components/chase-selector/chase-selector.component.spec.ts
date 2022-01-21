import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ChaseService, ChaseServiceMock } from 'chase-services';
import { ChaseSelectorComponent } from './chase-selector.component';

describe('ChaseSelectorComponent', () => {
  let component: ChaseSelectorComponent;
  let fixture: ComponentFixture<ChaseSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ ChaseSelectorComponent ],
      providers: [
        {
          provide: ChaseService,
          useClass: ChaseServiceMock
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaseSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
