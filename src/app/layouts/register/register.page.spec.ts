import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterLayoutPage } from './register.page';

describe('AuthPage', () => {
  let component: RegisterLayoutPage;
  let fixture: ComponentFixture<RegisterLayoutPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterLayoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
