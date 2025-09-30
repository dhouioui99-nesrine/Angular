import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePComponent } from './liste-p.component';

describe('ListePComponent', () => {
  let component: ListePComponent;
  let fixture: ComponentFixture<ListePComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListePComponent]
    });
    fixture = TestBed.createComponent(ListePComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
