import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrivilegiosPage } from './privilegios.page';

describe('PrivilegiosPage', () => {
  let component: PrivilegiosPage;
  let fixture: ComponentFixture<PrivilegiosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivilegiosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
