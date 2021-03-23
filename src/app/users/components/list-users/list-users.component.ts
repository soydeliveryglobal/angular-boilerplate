import { User } from '../../../core/models/User';
import { PageEvent } from '@angular/material/paginator';
import { Paginador } from '../../../navigation/paginador';
import { ResponseAll } from '../../../core/models/ResponseAll';
import { I18nServiceService } from '../../../core/services/i18n/i18n-service.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/core/services/login.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from 'src/app/core/services/abm/users.service';

@Component({
  selector: 'list-users',
  templateUrl: './list-users.template.html',
  styleUrls: ['./list-users.scss'],
})
export class ListUsersComponent extends Paginador implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  Users:MatTableDataSource<User>;
  environment = environment;


  displayedColumns: string[] = ['name','lastName','phone','actions'];


  ngOnInit() {
   // this.consultar();
  }

  private consultar() {
    this.usersService.getAll().subscribe((res: ResponseAll) => {
      this.Users = new MatTableDataSource(res.data);
      this.Users.sort = this.sort;
    });
  }

  constructor(
    private usersService: UsersService,
    private router: Router,
    private login: LoginService,
    private translate: TranslateService,
    private i18nService: I18nServiceService
  ) {
    super();
    this.i18nService.localeEvent$.subscribe((locale) => {
      this.translate.use(locale);
    });

    this.consultar()
  }

  deleteUser(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_USER,
      guid,
      environment.MODO_DELETE,
    ]);
  }

  updateUser(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_USER,
      guid,
      environment.MODO_UPDATE,
    ]);
  }

  userDetail(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_USER,
      guid,
      environment.MODO_DISPLAY,
    ]);
  }

  createUser() {
    this.router.navigate([
      environment.FORM_CRUD_USER,
      0,
      environment.MODO_CREATE,
    ]);
  }


  public  pageEvent(page: PageEvent ){   
    if (!page){
        this.pagina = environment.PAGINA_INICIAL;  
    }else{
        this.pagina = Number(page.pageIndex);
        this.pageSize = page.pageSize 
    }
    this.consultar();
  } 
  
}
