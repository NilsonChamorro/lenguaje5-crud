import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlumnoListPage } from './alumno-list.page'; // Asegúrate de ajustar la ruta según tu estructura de archivos

describe('AlumnoListPage', () => {
  let component: AlumnoListPage;
  let fixture: ComponentFixture<AlumnoListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumnoListPage ],
      // Añade otros módulos o proveedores necesarios para las pruebas
    }).compileComponents();

    fixture = TestBed.createComponent(AlumnoListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
