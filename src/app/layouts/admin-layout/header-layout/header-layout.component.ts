import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from '@core/authentication/user.service';
import { AuthService } from '@core/authentication/auth.service';

@Component({
  selector: 'header-layout',
  standalone: true,
  imports: [CommonModule, NzModalModule, NzIconModule, NzLayoutModule, NzDropDownModule],
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.less']
})
export default class AdminLayoutComponent {
  private modal = inject(NzModalService);
  private authService = inject(AuthService);
  private userService = inject(UserService)
  private router = inject(Router);
  private message = inject(NzMessageService);
  user$ = this.userService.user$; // 订阅 user$ 流
  @Input() isCollapsed = false
  @Output() collapsedChange = new EventEmitter();
  logout(): void {
    this.modal.confirm({
      nzTitle: '友情提示',
      nzContent: '是否确定退出登录？',
      nzOnOk: () => {
        this.authService.logout()
        this.router.navigateByUrl('/auth/login')
        this.message.success('退出登录成功');
      }
    });
  }
}
