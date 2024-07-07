import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateSongPage } from './createsong.page';

describe('CreateSongPage', () => {
  let component: CreateSongPage;
  let fixture: ComponentFixture<CreateSongPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSongPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
