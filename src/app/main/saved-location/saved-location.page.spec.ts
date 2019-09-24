import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedLocationPage } from './saved-location.page';

describe('SavedLocationPage', () => {
  let component: SavedLocationPage;
  let fixture: ComponentFixture<SavedLocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedLocationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
