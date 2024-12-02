import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuList, UserInfo } from '@core/authentication/types';
import { userInitData, menuInitData } from '@config/index';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private menuSubject = new BehaviorSubject<MenuList>([]);
  private userSubject = new BehaviorSubject<UserInfo>({});
  user$ = this.userSubject.asObservable(); // Observable 数据流
  menu$ = this.menuSubject.asObservable(); // Observable 数据流
  constructor() { }

  setUser(user: UserInfo) {
    this.userSubject.next(user);
  }

  setMenu(menu: MenuList) {
    this.menuSubject.next(menu)
  }

  /**
  * 获取用户相关配置
  */
  apiGetUserConfig() {
    const menus: MenuList = menuInitData
    const users = userInitData
    this.setUser(users)
    this.setMenu(menus)
    return true
  }
}
