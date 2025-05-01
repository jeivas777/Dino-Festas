import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacotesContainerComponent } from './pacotes-container.component';

describe('PacotesContainerComponent', () => {
  let component: PacotesContainerComponent;
  let fixture: ComponentFixture<PacotesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacotesContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacotesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
