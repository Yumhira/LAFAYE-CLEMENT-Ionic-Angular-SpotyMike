import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LastSongHeardPage } from './lastsongheard.page';

describe('LastSongHeardPage', () => {
  let component: LastSongHeardPage;
  let fixture: ComponentFixture<LastSongHeardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LastSongHeardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
