import { Component, OnInit } from '@angular/core';
import { collection, addDoc, updateDoc, getDoc, Firestore, doc, }
  from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alumno-edit',
  templateUrl: './alumno-edit.page.html',
  styleUrls: ['./alumno-edit.page.scss'],
})

export class AlumnoEditPage implements OnInit {
  alumno: any = [];
  id: any;
  constructor(private readonly firestore: Firestore,  private route: ActivatedRoute, private rt: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.id = params.id;
      if (this.id) {
        this.obtenerAlumno(this.id);
      }
    });
  }

  obtenerAlumno = (id: string) => {
    const document = doc(this.firestore, 'alumno', id);
    getDoc(document).then(doc => {
      console.log('registro a editar', doc.data());
      this.alumno = doc.data();
    }
    );
  }

  guardarAlumno = () => {
    console.log('aqui incluir en firebase');
    let alumnoRef = collection(this.firestore, 'alumno');
    addDoc(
      alumnoRef,
      {
        documento: this.alumno.documento,
        nombre: this.alumno.nombre,
        apellido: this.alumno.apellido
      }
    ).then(doc => {
      console.log('registro incluido');
      this.volver();
    }
    );
  }

  editarAlumno = (id: string) => {
    console.log('aqui editar en firebase');
    const document = doc(this.firestore, 'alumno', this.id);
    updateDoc(
      document,
      {
        documento: this.alumno.documento,
        nombre: this.alumno.nombre,
        apellido: this.alumno.apellido
      }
    ).then(doc => {
      console.log('registro editado');
      this.volver();
    }
    );
  }

  volver = () => {
    this.rt.navigate(['/alumno-list']);
  }

  accion = (id: string) => {
    if (this.id) {
      this.editarAlumno(this.id);
    } else {
      this.guardarAlumno();
    }
    this.volver();
  }

}
