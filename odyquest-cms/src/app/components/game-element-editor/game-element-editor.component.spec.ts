import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaseService, ChaseServiceMock } from 'chase-services';
import { GameElementEditorComponent } from './game-element-editor.component';

describe('GameElementEditorComponent', () => {
  let component: GameElementEditorComponent;
  let fixture: ComponentFixture<GameElementEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameElementEditorComponent ],
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
    fixture = TestBed.createComponent(GameElementEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
