import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarKitComponent } from './editar-kit.component';

describe('EditarKitComponent', () => {
  let component: EditarKitComponent;
  let fixture: ComponentFixture<EditarKitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarKitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
