import { Injectable, inject } from '@angular/core';
import { UserService } from '@core/authentication/user.service';
import { ApiService } from '@core/apiServices/api.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedUser = false; // 用于存储用户的认证状态
  private tokenKey = 'token'; // 本地存储的 token 键名
  private userService = inject(UserService)
  private apiService = inject(ApiService)
  constructor() { }
  /**
    * 检查是否已认证
    */
  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    this.isAuthenticatedUser = !!token; // 根据是否有 token 判断认证状态
    return this.isAuthenticatedUser;
  }
  /**
   * 模拟登录
   * @param username 用户名
   * @param password 密码
   */
  login(username: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.apiService.post('admin/login', {
        userName: username,
        password,
      }).subscribe({
        next: async (value) => {
          localStorage.setItem(this.tokenKey, value.data.token); // 存储 token
          this.isAuthenticatedUser = true;
          this.userService.apiGetUserConfig()
          resolve(true)
        },
        error: (err) => {
          console.error('错误:', err);
          resolve(false)
        }
      });
    });
  }

  /**
   * 模拟退出登录
   */
  logout(): void {
    this.isAuthenticatedUser = false;
    this.userService.setMenu([]);
    this.userService.setUser({});
    localStorage.clear(); // 移除所有信息
  }

  /**
   * 获取当前用户的 token
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  /**
   * 清除当前用户的 token
   */
  clearToken() {
    localStorage.removeItem(this.tokenKey); // 移除 token
  }
}
