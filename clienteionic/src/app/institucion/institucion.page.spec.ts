import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstitucionPage } from './institucion.page';

describe('InstitucionPage', () => {
  let component: InstitucionPage;
  let fixture: ComponentFixture<InstitucionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitucionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
