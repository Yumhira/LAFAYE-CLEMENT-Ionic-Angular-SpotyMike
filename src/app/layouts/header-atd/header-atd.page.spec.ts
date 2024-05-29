import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderATDPage } from './header-atd.page';

describe('HeaderATDPage', () => {
  let component: HeaderATDPage;
  let fixture: ComponentFixture<HeaderATDPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderATDPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
