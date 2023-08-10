import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajesRealizadosComponent } from './viajes-realizados.component';

describe('ViajesRealizadosComponent', () => {
  let component: ViajesRealizadosComponent;
  let fixture: ComponentFixture<ViajesRealizadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViajesRealizadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViajesRealizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
