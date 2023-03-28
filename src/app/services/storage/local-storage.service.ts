import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
    localStorage.clear()
  }

  public set(key: string, value: string) {
    this.remove(key);
    localStorage.setItem(key, value);
  }

  public get(key: string) {
    return localStorage.getItem(key);
  }

  public remove(key: string) {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }
}