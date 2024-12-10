import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RespuestaencuestaPage } from './respuestaencuesta.page';

describe('RespuestaencuestaPage', () => {
  let component: RespuestaencuestaPage;
  let fixture: ComponentFixture<RespuestaencuestaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RespuestaencuestaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
