import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NonNullableFormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { AuthService } from '@core/authentication/auth.service';
import { website } from '@config/index';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzFormModule, NzAlertModule, NzButtonModule, NzInputModule, NzIconModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export default class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  readonly websiteData = website;
  constructor(private route: Router, private authService: AuthService, private fb: NonNullableFormBuilder, private message: NzMessageService) { }
  passwordVisible = false
  ngOnInit() {
    this.validateForm = this.fb.group({
      username: this.fb.control('trkj', [Validators.required]),
      password: this.fb.control('tianruan@2024', [Validators.required]),
    });
    const token = localStorage.getItem('token'); // 检查 Token
    if (token) {
      // 如果存在 Token，跳转到首页
      this.message.warning('您已经登录，请退出后进入登录页');
      this.navigateToPage()
    }
  }
  async submitForm() {
    if (this.validateForm.valid) {
      const resStatus = await this.authService.login(this.validateForm.value.username, this.validateForm.value.password)
      if (resStatus) {
        this.message.success('登录成功');
        this.route.navigateByUrl('/')
      }
    } else {
      // this.message.error('请检查表单是否填写正确！');
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
    }
  }
  navigateToPage = () => {
    this.route.navigateByUrl('/')
  }
}
