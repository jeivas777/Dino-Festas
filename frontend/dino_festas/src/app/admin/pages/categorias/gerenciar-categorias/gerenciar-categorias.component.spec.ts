import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarCategoriasComponent } from './gerenciar-categorias.component';

describe('GerenciarCategoriasComponent', () => {
  let component: GerenciarCategoriasComponent;
  let fixture: ComponentFixture<GerenciarCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarCategoriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
