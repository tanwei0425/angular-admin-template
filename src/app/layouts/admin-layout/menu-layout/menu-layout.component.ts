import { Component, Input, inject } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { UserService } from '@core/authentication/user.service';
import { website } from '@config/index';
@Component({
  selector: 'menu-layout',
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet, NzIconModule, RouterLink, NzLayoutModule, NzMenuModule],
  templateUrl: './menu-layout.component.html',
  styleUrls: ['./menu-layout.component.less']
})
export default class AdminLayoutComponent {
  private userService = inject(UserService)
  @Input() isCollapsed = false
  readonly websiteData = website;
  menu$ = this.userService.menu$; // 订阅 user$ 流
}
