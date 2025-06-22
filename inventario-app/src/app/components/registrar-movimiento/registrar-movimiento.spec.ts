import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarMovimientoComponent } from './registrar-movimiento';

describe('RegistrarMovimiento', () => {
  let component: RegistrarMovimientoComponent;
  let fixture: ComponentFixture<RegistrarMovimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarMovimientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
