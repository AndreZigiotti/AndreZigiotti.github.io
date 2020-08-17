import { Component, Renderer2 } from '@angular/core';
import { ThemeService } from './shared/services/theme/theme.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThemeName } from './shared/types/themes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pwa';
  currentTheme: ThemeName

  private unsubscribe: Subject<any> = new Subject<any>()

  constructor(private themeService: ThemeService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.themeService.currentTheme$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((themeName: ThemeName) => {
        this.renderer.removeClass(document.body, this.currentTheme)

        this.currentTheme = themeName
        this.renderer.addClass(document.body, themeName)
      })

    let storedTheme = this.themeService.loadTheme()
    if(storedTheme) {
      this.themeService.activateTheme(storedTheme)
    } else {
      this.themeService.activateTheme(this.themeService.defaultTheme)
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next()
    this.unsubscribe.complete()
  }
}
