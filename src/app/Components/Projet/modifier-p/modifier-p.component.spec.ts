import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierPComponent } from './modifier-p.component';

describe('ModifierPComponent', () => {
  let component: ModifierPComponent;
  let fixture: ComponentFixture<ModifierPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierPComponent]
    });
    fixture = TestBed.createComponent(ModifierPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
