import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl
  private apiPrefix = environment.apiPrefix
  private baseUrl = this.apiUrl + this.apiPrefix

  constructor(private http: HttpClient) { }
  // GET 请求
  get(endpoint: string, params?: { [key: string]: string | number }): Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}`, { params });
  }

  // POST 请求
  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${endpoint}`, data);
  }

  // PUT 请求
  put(endpoint: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${endpoint}`, data);
  }

  // DELETE 请求
  delete(endpoint: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${endpoint}`);
  }
}
