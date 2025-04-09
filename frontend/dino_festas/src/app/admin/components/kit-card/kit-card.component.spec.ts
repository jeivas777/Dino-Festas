import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitCardComponent } from './kit-card.component';

describe('KitCardComponent', () => {
  let component: KitCardComponent;
  let fixture: ComponentFixture<KitCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
