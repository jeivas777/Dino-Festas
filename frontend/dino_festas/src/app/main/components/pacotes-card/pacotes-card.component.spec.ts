import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacotesCardComponent } from './pacotes-card.component';

describe('PacotesCardComponent', () => {
  let component: PacotesCardComponent;
  let fixture: ComponentFixture<PacotesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacotesCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacotesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
