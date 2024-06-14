import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountHeadPage } from './account-head.page';

describe('AccountHeadPage', () => {
  let component: AccountHeadPage;
  let fixture: ComponentFixture<AccountHeadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountHeadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
