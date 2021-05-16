import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../model/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public staticData: Menu[] = [
    { menuId: 1, menuName: 'Home', active: true },
    { menuId: 2, menuName: 'Create Flight', active: false },
    { menuId: 3, menuName: 'Modify Flight', active: false },
    { menuId: 4, menuName: 'Delete Flight', active: false },
    { menuId: 5, menuName: 'View Flight', active: false },
  ];

  constructor() { }

  public emitFakeApiResponse = (): Observable<Menu[]> => {
    return new Observable(observer => {
      if (this.staticData.length > 0) {
        observer.next(this.staticData);
        return;
      }
      observer.error('Data is Null');
    });
  }

}
