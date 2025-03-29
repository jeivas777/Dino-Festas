import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensContainerComponent } from './itens-container.component';

describe('ItensContainerComponent', () => {
  let component: ItensContainerComponent;
  let fixture: ComponentFixture<ItensContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItensContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItensContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
