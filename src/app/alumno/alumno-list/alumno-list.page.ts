import { Component, OnInit } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumno-list',
  templateUrl: './alumno-list.page.html',
  styleUrls: ['./alumno-list.page.scss'],
})
export class AlumnoListPage implements OnInit {
  listaAlumnos: any[] = [];

  constructor(private readonly firestore: Firestore, private rt: Router) { }

  ngOnInit() {
    this.listarAlumnos();
  }

  listarAlumnos = () => {
    console.log("listar alumnos");
    const alumnosRef = collection(this.firestore, "alumno");
    collectionData(alumnosRef, { idField: 'id' }).subscribe(respuesta => {
      console.log("estos son los alumnos", respuesta);
      this.listaAlumnos = respuesta;
    });
  }

  nuevo = () => {
    console.log("nuevo alumno");
    this.rt.navigate(['/alumno-edit']);
  }

  eliminarAlumno = (id: string) => {
    console.log('aqui eliminar en firebase');
    const document = doc(this.firestore, 'alumno', id);

    deleteDoc(document).then(() => {
      console.log('registro eliminado');
      //this.volver();
    }).catch((error) => {
      console.error("Error al eliminar el documento: ", error);
    });

  }

}
