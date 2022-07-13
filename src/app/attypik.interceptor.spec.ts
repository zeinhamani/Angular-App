import { TestBed } from '@angular/core/testing';

import { AttypikInterceptor } from './attypik.interceptor';

describe('AttypikInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AttypikInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AttypikInterceptor = TestBed.inject(AttypikInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
