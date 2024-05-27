import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LikePage } from './like.page';

describe('LikePage', () => {
  let component: LikePage;
  let fixture: ComponentFixture<LikePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LikePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
