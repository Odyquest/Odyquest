import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeInputComponent } from './qrcode-input.component';

describe('QrcodeInputComponent', () => {
  let component: QrcodeInputComponent;
  let fixture: ComponentFixture<QrcodeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrcodeInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrcodeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
