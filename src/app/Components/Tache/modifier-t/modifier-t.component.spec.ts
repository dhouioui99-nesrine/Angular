import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierTComponent } from './modifier-t.component';

describe('ModifierTComponent', () => {
  let component: ModifierTComponent;
  let fixture: ComponentFixture<ModifierTComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierTComponent]
    });
    fixture = TestBed.createComponent(ModifierTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
