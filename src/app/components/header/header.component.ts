import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../shared/services/theme/theme.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isDarkModeActive: boolean = false

  private unsubscribe = new Subject()

  constructor(private themeService: ThemeService) {
    if(this.themeService.currentTheme === 'pwa-dark-theme') this.isDarkModeActive = true;
  }

  ngOnInit(): void {
    this.themeService.currentTheme$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(theme => {
        if(theme === 'pwa-dark-theme') this.isDarkModeActive = true;
        else this.isDarkModeActive = false;
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe.next()
    this.unsubscribe.complete()
  }

  switchTheme() {
    if(this.isDarkModeActive) {
      this.themeService.activateTheme('pwa-light-theme')
    } else {
      this.themeService.activateTheme('pwa-dark-theme')
    }
  }

}
