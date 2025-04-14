import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarKitsComponent } from './gerenciar-kits.component';

describe('GerenciarKitsComponent', () => {
  let component: GerenciarKitsComponent;
  let fixture: ComponentFixture<GerenciarKitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarKitsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GerenciarKitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
