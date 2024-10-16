import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EsqueceusenhaPage } from './esqueceusenha.page';

describe('EsqueceusenhaPage', () => {
  let component: EsqueceusenhaPage;
  let fixture: ComponentFixture<EsqueceusenhaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EsqueceusenhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
