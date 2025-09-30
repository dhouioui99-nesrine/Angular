import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterTComponent } from './ajouter-t.component';

describe('AjouterTComponent', () => {
  let component: AjouterTComponent;
  let fixture: ComponentFixture<AjouterTComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterTComponent]
    });
    fixture = TestBed.createComponent(AjouterTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
