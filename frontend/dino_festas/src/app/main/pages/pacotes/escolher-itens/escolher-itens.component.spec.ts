import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscolherItensComponent } from './escolher-itens.component';

describe('EscolherItensComponent', () => {
  let component: EscolherItensComponent;
  let fixture: ComponentFixture<EscolherItensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscolherItensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscolherItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
