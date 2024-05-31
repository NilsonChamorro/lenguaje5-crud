import { Component, OnInit } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, Firestore, getDocs, limit, query, startAfter, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-alumno-list',
  templateUrl: './alumno-list.page.html',
  styleUrls: ['./alumno-list.page.scss'],
})

export class AlumnoListPage implements OnInit {
  query = "";
  lastVisible: any;
  stAt = 0;
  li = 10;
  isSearch: boolean = false;
  listaAlumnos: any[] = [];

  constructor(private readonly firestore: Firestore, private rt: Router) { }

  ngOnInit() {
    this.listarAlumnos();
  }

  clickSearch = () => {
    this.isSearch = true;
  }

  clearSearch = () => {
    this.isSearch = false;
    this.query = "";

    this.listaAlumnos = new Array();
    this.lastVisible = null;
    this.listarAlumnos();
  }

  buscarSearch = (e: any) => {
    this.isSearch = false;
    this.query = e.target.value;

    this.listaAlumnos = new Array();
    this.lastVisible = null;
    this.listarAlumnos();
  }


  listarAlumnosOLD = () => {
    console.log("listar alumnos");
    const alumnosRef = collection(this.firestore, "alumno");
    collectionData(alumnosRef, { idField: 'id' }).subscribe(respuesta => {
      console.log("estos son los alumnos", respuesta);
      this.listaAlumnos = respuesta;
    });
  }

  listarAlumnosSinFiltro = () => {
    const alumnosRef = collection(this.firestore, 'alumno');

    let q = undefined;
    if (this.lastVisible) {
      q = query(alumnosRef, limit(this.li), startAfter(this.lastVisible));
    } else {
      q = query(alumnosRef, limit(this.li));
    }

    const querySnapshot = getDocs(q).then(re => {
      if (!re.empty) {
        this.lastVisible = re.docs[re.docs.length - 1];
        re.forEach(doc => {
          //console.log("queryyyy", doc.id, "data", doc.data());
          let alumno: any = doc.data();
          alumno.id = doc.id;
          this.listaAlumnos.push(alumno);
        });
      }
    });
  }

  listarAlumnos = () => {
    const alumnosRef = collection(this.firestore, 'alumno');
    if ((this.query + "").length > 0) {
      let q = undefined;
      if (this.lastVisible) {
        q = query(alumnosRef,
          where("nombre", ">=", this.query.toUpperCase()),
          where("nombre", "<=", this.query.toLowerCase() + '\uf8ff'),
          limit(this.li),
          startAfter(this.lastVisible));


      } else {
        q = query(alumnosRef,
          where("nombre", ">=", this.query.toUpperCase()),
          where("nombre", "<=", this.query.toLowerCase() + '\uf8ff'),
          limit(this.li));
      }
      getDocs(q).then(re => {
        if (!re.empty) {
          this.stAt += this.li;
          this.lastVisible = re.docs[re.docs.length - 1];
          re.forEach(doc => {
            let alumno: any = doc.data();
            alumno.id = doc.id;
            this.listaAlumnos.push(alumno);
          });
        }
      });
    } else {
      this.listarAlumnosSinFiltro();
    }
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
