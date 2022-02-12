import { TestBed } from '@angular/core/testing';

import { ChaseEditorService } from './chase-editor.service';

describe('ChaseEditorService', () => {
  let service: ChaseEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
      ]
    });
    service = TestBed.inject(ChaseEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
