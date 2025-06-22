import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeProductoComponent } from './informe-producto';

describe('InformeProducto', () => {
  let component: InformeProductoComponent;
  let fixture: ComponentFixture<InformeProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformeProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformeProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
