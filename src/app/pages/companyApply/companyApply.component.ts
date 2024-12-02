import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from '@core/apiServices/api.service';
import { tabelDataType } from './types'

@Component({
  selector: 'app-companyApply',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NzFormModule, NzButtonModule, NzInputModule, NzTableModule, NzToolTipModule, NzDividerModule],
  templateUrl: './companyApply.component.html',
  styleUrls: ['./companyApply.component.less']
})
export class CompanyApplyComponent implements OnInit {
  validateForm!: FormGroup;
  constructor(private fb: NonNullableFormBuilder) { }
  private apiService = inject(ApiService)
  private message = inject(NzMessageService)
  data: tabelDataType[] = []
  labelNzSpan = 8
  controlNzSpan = 16
  loading = false
  pagination = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
  }
  ngOnInit() {
    this.validateForm = this.fb.group({
      mobile: this.fb.control(''),
    });
  }
  auditClick(id: number, auditStatus: number): void {
    const data = {
      id,
      audit: auditStatus,
    }
    this.loading = true
    this.apiService.post('company/audit', data).subscribe({
      next: (value) => {
        this.message.success('操作成功')
        this.loading = false
        this.getTableData()
      },
      error: (error) => {
        console.error('错误:', error);
      },
    });
  }
  submitForm(): void {
    console.log('Form Values:', this.validateForm.value);
    this.pagination = {
      total: 0,
      pageIndex: 1,
      pageSize: 10,
    }
    this.getTableData()
  }
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    this.pagination = {
      total: 0,
      pageIndex: 1,
      pageSize: 10,
    }
    this.getTableData()
  }
  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.pagination.pageIndex = pageIndex
    this.pagination.pageSize = pageSize
    this.getTableData()
  }
  getTableData() {
    this.loading = true
    const data = {
      mobile: this.validateForm.value.mobile,
      pageNum: this.pagination.pageIndex,
      pageSize: this.pagination.pageSize,
    }
    this.apiService.get('company/list', data).subscribe({
      next: (value) => {
        console.log(value, 'value');
        return;
        const data = value?.data?.content
        const total = value?.data?.totalElements
        this.data = data
        this.pagination.total = total
        this.loading = false
      },
      error: (error) => {
        console.error('错误:', error);
      },
    });
  }
}
