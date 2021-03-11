import { Router } from '@angular/router';
import { I18nServiceService } from './../../core/services/i18n/i18n-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { map, takeUntil,filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'nb-header',
  styleUrls: ['./nb-header.component.scss'],
  templateUrl: './/nb-header.component.html',
})
export class NbHeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  locale: string

  themes = [
    {
      value: 'default',
      name: 'Light',
    }
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
             // private userService: UserData,
             // private layoutService: LayoutService,
              private translate: TranslateService,
              private i18nService: I18nServiceService,
              private Router:Router,
              private breakpointService: NbMediaBreakpointsService) {
  }

  ngOnInit() {

    this.i18nService.localeEvent$.subscribe((locale) => {
      this.locale = locale
      this.translate.use(locale)
    });

    this.currentTheme = this.themeService.currentTheme;

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

      this.userMenuOnClick()
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    //this.layoutService.changeLayoutSize();

    return false;
  }

  changeLocale(locale: string): void {
    this.i18nService.changeLocale(locale);
  }

  userMenuOnClick(){
    this.menuService.onItemClick()
    .pipe(
      filter(({ tag }) => tag === 'userMenu'),
      map(({ item: { title } }) => title),
    )
    .subscribe(title => alert(`${title} was clicked!`));
  }
}
