import { Injectable } from '@angular/core';
import { NavGroup } from '../nav-group.model';
import { NavItem } from '../nav-item.model';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class GoSideNavService {
  public navOpen: boolean = true;
  public menuItems: (NavGroup | NavItem)[];
  private _menuItems: Map<string, (NavGroup | NavItem)> = new Map();
  private currentItem: NavItem | NavGroup;

  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const obj: NavGroup | NavItem = this._menuItems.get(event.urlAfterRedirects);
        if (obj) {
          if (this.currentItem) {
            this.currentItem.routeActive = false;
          }

          obj.routeActive = true;
          this.currentItem = obj;
        }
      }
    });
  }

  setMenuItems(val: (NavGroup | NavItem)[]): void {
    this.menuItems = val;
    this.createNavMap();
  }

  toggleNav(): void {
    this.navOpen = !this.navOpen;
  }

  private isNavGroup(item: NavGroup | NavItem): item is NavGroup {
    return (item as NavGroup).subRoutes !== undefined;
  }

  private extractNested(group: NavGroup, base: NavGroup): void {
    for (const route of group.subRoutes) {
      if (this.isNavGroup(route)) {
        this.extractNested(route, base);
      } else {
        this._menuItems.set('/' + route.route, base);
      }
    }
  }

  private createNavMap(): void {
    let baseItem: NavGroup | NavItem;
    for (let i: number = 0; i < this.menuItems.length; i++) {
      baseItem = this.menuItems[i];
      if (!this.isNavGroup(baseItem)) {
        this._menuItems.set('/' + baseItem.route, baseItem);
      } else {
        this.extractNested(baseItem, baseItem);
      }
    }
  }
}
