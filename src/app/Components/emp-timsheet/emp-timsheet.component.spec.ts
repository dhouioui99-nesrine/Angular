import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpTimsheetComponent } from './emp-timsheet.component';

describe('EmpTimsheetComponent', () => {
  let component: EmpTimsheetComponent;
  let fixture: ComponentFixture<EmpTimsheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpTimsheetComponent]
    });
    fixture = TestBed.createComponent(EmpTimsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
