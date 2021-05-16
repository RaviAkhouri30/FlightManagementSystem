import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../dashboard/model/menu';
import { MenuService } from '../dashboard/service/menu.service';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(
    private menuService: MenuService
  ) { }

  public getMenuData = (): Observable<Menu[]> => {
    return this.menuService.emitFakeApiResponse();
  }

}
