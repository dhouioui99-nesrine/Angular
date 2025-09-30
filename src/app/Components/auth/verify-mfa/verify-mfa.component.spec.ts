import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyMFAComponent } from './verify-mfa.component';

describe('VerifyMFAComponent', () => {
  let component: VerifyMFAComponent;
  let fixture: ComponentFixture<VerifyMFAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyMFAComponent]
    });
    fixture = TestBed.createComponent(VerifyMFAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
