import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaseServicesComponent } from './chase-services.component';

describe('ChaseServicesComponent', () => {
  let component: ChaseServicesComponent;
  let fixture: ComponentFixture<ChaseServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChaseServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaseServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
