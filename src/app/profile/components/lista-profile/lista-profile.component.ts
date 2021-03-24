import { PageEvent } from '@angular/material/paginator';
import { Paginador } from './../../../navigation/paginador';
import { ResponseAll } from './../../../core/models/ResponseAll';
import { I18nServiceService } from './../../../core/services/i18n/i18n-service.service';
import { TranslateService } from '@ngx-translate/core';
import { Profile } from './../../../core/models/profile';
import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProfileService } from 'src/app/core/services/abm/profile.service';
import { LoginService } from 'src/app/core/services/login.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'lista-profile',
  templateUrl: './lista-profile.template.html',
  styleUrls: ['./lista-profile.scss'],
})
export class ListaProfileComponent extends Paginador implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  Profiles:MatTableDataSource<Profile>;
  environment = environment;


  displayedColumns: string[] = ['name','description','createdOn','updatedOn','actions'];

  ngOnInit() {
   // this.consultar();
  }

  private consultar(query:string) {
    this.profileService.getAll(query).subscribe((res: ResponseAll) => {
      this.Profiles = new MatTableDataSource(res.data);
      this.Profiles.sort = this.sort;
      this.pagina= res.page;
      this.cantidadDeRegistros = res.count;
    });
  }

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private login: LoginService,
    private translate: TranslateService,
    private i18nService: I18nServiceService
  ) {
    super();
    this.i18nService.localeEvent$.subscribe((locale) => {
      this.translate.use(locale);
    });

    const query = this.createPaging()
    this.consultar(query);
  }

  deleteProfile(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_PROFILE,
      guid,
      environment.MODO_DELETE,
    ]);
  }

  updateProfile(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_PROFILE,
      guid,
      environment.MODO_UPDATE,
    ]);
  }

  profileDetail(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_PROFILE,
      guid,
      environment.MODO_DISPLAY,
    ]);
  }

  createProfile() {
    this.router.navigate([
      environment.FORM_CRUD_PROFILE,
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
    
    const query = this.createPaging()
    this.consultar(query);
  } 

}
