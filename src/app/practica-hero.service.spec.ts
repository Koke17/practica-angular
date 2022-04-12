import { TestBed } from '@angular/core/testing';

import { PracticaHeroService } from './practica-hero.service';

describe('PracticaHeroService', () => {
  let service: PracticaHeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PracticaHeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
