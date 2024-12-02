import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
@Component({
  selector: 'app-monitor',
  standalone: true,
  imports: [NzButtonModule],
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.less']
})
export class MonitorComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  @Input() childrenValue = ''
  @Input() inputValue = ''
  @Output() childrenEvent = new EventEmitter<{ name: string, num: number }>();
  num = 0
  buttonClick() {
    this.num = this.num + 1
    this.childrenEvent.emit({ name: 'monitor', num: this.num });
  }

}
