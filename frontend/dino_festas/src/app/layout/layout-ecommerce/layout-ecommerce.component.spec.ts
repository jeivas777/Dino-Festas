import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutEcommerceComponent } from './layout-ecommerce.component';

describe('LayoutEcommerceComponent', () => {
  let component: LayoutEcommerceComponent;
  let fixture: ComponentFixture<LayoutEcommerceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutEcommerceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutEcommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
