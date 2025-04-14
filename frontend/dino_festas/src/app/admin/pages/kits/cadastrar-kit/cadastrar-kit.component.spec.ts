import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarKitComponent } from './cadastrar-kit.component';

describe('CadastrarKitComponent', () => {
  let component: CadastrarKitComponent;
  let fixture: ComponentFixture<CadastrarKitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarKitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
