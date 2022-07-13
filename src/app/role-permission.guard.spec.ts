import { TestBed } from '@angular/core/testing';

import { RolePermissionGuard } from './role-permission.guard';

describe('RolePermissionGuard', () => {
  let guard: RolePermissionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RolePermissionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
