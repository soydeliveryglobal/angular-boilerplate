import { LoginService } from './../../../core/services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Administrador } from 'src/app/core/models/Administrator';
import { AdministradorService } from 'src/app/core/services/administrador.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-miabmlist',
  templateUrl: './miabmlist.component.html',
  styleUrls: ['./miabmlist.component.scss'],
})
export class MiabmlistComponent implements OnInit {
  administradores: Administrador[];
  environment = environment;

  constructor(
    private administradorService: AdministradorService,
    private router: Router,
    private login: LoginService
  ) {}

  ngOnInit() {
    this.consultar();
  }

  private consultar() {
    this.administradorService
      .getAll()
      .subscribe((administrador: Administrador[]) => {
        this.administradores = administrador;
        console.log('esto', administrador);
      });
  }

  administradorActual(administrador: Administrador) {
    let administradorLogueado = this.login.obtenerAdministradorLogueado();
    return administradorLogueado.id == administrador.id;
  }

  nuevoAdministrador(p: Administrador) {
    this.administradores.push(p);
  }

  deleteAdministrador(id: number) {
    this.router.navigate([
      environment.FORM_CRUD_MI_ABM,
      id,
      environment.MODO_DELETE,
    ]);
  }

  updateAdministrador(id: number) {
    this.router.navigate([
      environment.FORM_CRUD_MI_ABM,
      id,
      environment.MODO_UPDATE,
    ]);
  }

  administradorDetails(id: number) {
    this.router.navigate([
      environment.FORM_CRUD_MI_ABM,
      id,
      environment.MODO_DISPLAY,
    ]);
  }

  createAdministrador() {
    this.router.navigate([
      environment.FORM_CRUD_MI_ABM,
      0,
      environment.MODO_CREATE,
    ]);
  }
}
