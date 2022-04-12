import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDetalleComponent } from './hero-detalle.component';

describe('HeroDetalleComponent', () => {
  let component: HeroDetalleComponent;
  let fixture: ComponentFixture<HeroDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
