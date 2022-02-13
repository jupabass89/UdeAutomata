import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { optionsMenu } from './constants/menu-options';
import { url } from './constants/url';

@Component({
  selector: 'app-component',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements OnDestroy{
  mobileQuery: MediaQueryList;
  menuOptionSelected = 0;
  url = Object.values(url);
  fillerNav = optionsMenu;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  selectMenuOption(option: number) {
    this.menuOptionSelected = option;
  }

  pdfOptionSelected(i: number): boolean {
    return this.menuOptionSelected === i && this.menuOptionSelected !== 0 && this.menuOptionSelected !== 4
  }
}
