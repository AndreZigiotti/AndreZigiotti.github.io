import { Injectable } from '@angular/core';
import { ThemeName } from '../../types/themes';
import { Subject } from 'rxjs';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  currentTheme$: Subject<ThemeName> = new Subject()
  currentTheme: ThemeName

  availableThemes: ThemeName[] = ['pwa-light-theme', 'pwa-dark-theme']
  defaultTheme: ThemeName = 'pwa-light-theme'

  constructor(private storageService: StorageService) {}

  activateTheme(themeName: ThemeName) {
    this.currentTheme$.next(themeName)
    this.currentTheme = themeName;
    this.saveTheme(themeName)
  }

  saveTheme(themeName: ThemeName) {
    this.storageService.setItem('theme', themeName)
  }

  loadTheme() {
    return this.storageService.getItem('theme')
  }
}
