import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OQueEPage } from './o-que-e.page';

describe('OQueEPage', () => {
  let component: OQueEPage;
  let fixture: ComponentFixture<OQueEPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OQueEPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
