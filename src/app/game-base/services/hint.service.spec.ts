import { TestBed, inject } from '@angular/core/testing';

import { HintService } from './hint.service';

describe('HintService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HintService]
    });
  });

  // it('should ...', inject([HintService], (service: HintService) => {
  //   expect(service).toBeTruthy();
  // }));
});
