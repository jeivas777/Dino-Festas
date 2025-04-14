import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarItensComponent } from './gerenciar-itens.component';

describe('GerenciarItensComponent', () => {
  let component: GerenciarItensComponent;
  let fixture: ComponentFixture<GerenciarItensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarItensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
