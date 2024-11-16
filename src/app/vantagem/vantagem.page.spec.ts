import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VantagemPage } from './vantagem.page';

describe('VantagemPage', () => {
  let component: VantagemPage;
  let fixture: ComponentFixture<VantagemPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VantagemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
