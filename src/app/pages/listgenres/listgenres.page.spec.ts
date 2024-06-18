import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListGenresPage } from './listgenres.page';

describe('ListGenres', () => {
  let component: ListGenresPage;
  let fixture: ComponentFixture<ListGenresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGenresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
