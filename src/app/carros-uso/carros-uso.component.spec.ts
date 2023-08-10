import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrosUsoComponent } from './carros-uso.component';

describe('CarrosUsoComponent', () => {
  let component: CarrosUsoComponent;
  let fixture: ComponentFixture<CarrosUsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrosUsoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrosUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
