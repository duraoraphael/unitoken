import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Metodo2faPage } from './metodo2fa.page';

describe('Metodo2faPage', () => {
  let component: Metodo2faPage;
  let fixture: ComponentFixture<Metodo2faPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Metodo2faPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
