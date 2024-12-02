import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import HeaderLayoutComponent from '@src/app/layouts/admin-layout/header-layout/header-layout.component';
import MenuLayoutComponent from '@src/app/layouts/admin-layout/menu-layout/menu-layout.component';
import { UserService } from '@core/authentication/user.service';
import { AuthService } from '@core/authentication/auth.service';

@Component({
  selector: 'admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzSpinModule, NzMenuModule, HeaderLayoutComponent, MenuLayoutComponent],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.less']
})
export default class AdminLayoutComponent implements OnInit {
  private authService = inject(AuthService)
  private userService = inject(UserService)
  user$ = this.userService.user$; // 订阅 user$ 流
  isCollapsed = false;
  collapsedChange() {
    this.isCollapsed = !this.isCollapsed
  }
  isDataLoaded = true;

  ngOnInit(): void {
    this.authService.isAuthenticated() && this.getUser()
  }
  getUser() {
    this.userService.apiGetUserConfig()
  }
}
