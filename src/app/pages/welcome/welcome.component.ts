import { Component, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { MonitorComponent } from '../monitor/monitor.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [NzButtonModule, NzSpaceModule, NzPopoverModule, NzInputModule, FormsModule, NzDividerModule, MonitorComponent, NgOptimizedImage],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() { }
  childrenValue = '我是父组件Welcome传递过来的值'
  childrenEvent($event: { name: string, num: number }) {
    this.age1 = this.age1 + 1
    this.childrenObj = $event
  }
  childrenObj = {
    name: '',
    num: 0,
  }
  inputValue = ''
  butDis = false
  name = 'tanwei'
  age1 = 9
  age2 = 21
  list = ['按钮1', '按钮2', '按钮3',]
  butClick = () => {
    this.butDis = !this.butDis
  }
  navigateToPage = () => {
    this.route.navigateByUrl('/basicForm')
  }
}
