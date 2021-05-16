import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { Menu } from './model/menu';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private menu: Menu[] = [];

  constructor(
    private service: ApiServiceService
  ) { }

  ngOnInit(): void {
    this.getMenuData();
  }

  public getMenuData = (): void => {
    this.service.getMenuData().subscribe((res) => {
      if (res) {
        this.setMenu(res);
      }
    });
  }

  public setMenu = (menu: Menu[]): void => {
    this.menu = menu;
  }

  public getMenu = (): Menu[] => {
    return this.menu;
  }

  public loadComponent = (menuId: number): boolean => {
    return this.getMenu().find(e => e.menuId === menuId)?.active || false;
  }

  public navigate = (menuId: number): void => {
    this.getMenu().forEach(e => {
      if (e.menuId === menuId) {
        e.active = true;
        return;
      }
      e.active = false;
    });
  }

}
