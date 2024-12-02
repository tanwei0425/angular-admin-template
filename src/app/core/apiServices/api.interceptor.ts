import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse, HttpResponse, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '@core/authentication/auth.service';
interface ApiResponse<T> {
  status: string;
  data: T;
  message: string;
  timestamp?: string;
}
export const apiInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next) => {
  const authService = inject(AuthService)
  const router = inject(Router);
  const message = inject(NzMessageService);
  const token = authService.getToken() // 从本地存储获取 Token

  let headers: any = { 'Content-Type': 'application/json' }
  // 如果存在 Token，则将其添加到请求头
  token && (headers['Authorization'] = token)
  const customReq = req.clone({ setHeaders: headers });
  return next(customReq).pipe(
    map((event: any) => {
      if (event instanceof HttpResponse) {
        const response = event.body as ApiResponse<any>;
        if (response.status === 'success') {
          // 如果状态是 success, 返回主体数据
          return event.clone({ body: response.data });
        } else if (response?.status === 'no login') {
          // 如果状态是 no login, 跳转到登录页面或其他处理逻辑
          authService.logout()
          router.navigateByUrl('/auth/login')
          message.warning('未登录或登录超时，请先登录');
        } else {
          // 如果不是 success、no login，用 message 弹出提示
          const errorMessage = response?.message || '操作失败';
          message.error(errorMessage);
          return throwError(() => new Error(errorMessage));
        }
      }
      // 如果不是 HttpResponse 类型，则直接返回原始 event
      return event;
    }),
    catchError((error: HttpErrorResponse) => {
      message.error(error.message);
      return throwError(() => new Error(error.message));
    })
  );
};
