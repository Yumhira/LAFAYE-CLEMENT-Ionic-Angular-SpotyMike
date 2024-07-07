import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAlbumPage } from './createalbum.page';

describe('CreateAlbumPage', () => {
  let component: CreateAlbumPage;
  let fixture: ComponentFixture<CreateAlbumPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAlbumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
