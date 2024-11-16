import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComofuncionaPage } from './comofunciona.page';

describe('ComofuncionaPage', () => {
  let component: ComofuncionaPage;
  let fixture: ComponentFixture<ComofuncionaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComofuncionaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
