import { Component, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzMarks, NzSliderModule } from 'ng-zorro-antd/slider';
import { NzCascaderModule, NzCascaderOption } from 'ng-zorro-antd/cascader';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzColorPickerModule } from 'ng-zorro-antd/color-picker';
@Component({
  selector: 'app-basicForm',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzSliderModule, NzColorPickerModule, NzCascaderModule, NzTreeSelectModule, NzFormModule, NzDatePickerModule, NzSpaceModule, NzRadioModule, NzButtonModule, NzCheckboxModule, NzInputModule, NzSelectModule, NzIconModule],
  templateUrl: './basicForm.component.html',
  styleUrls: ['./basicForm.component.less']
})
export class BasicFormComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(private fb: NonNullableFormBuilder, private message: NzMessageService,) { }
  ngOnInit() {
    const today = new Date(); // 当前日期
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(today.getDate() + 7); // 7天后的日期

    this.validateForm = this.fb.group({
      username: this.fb.control('我是名字', [Validators.required]),
      password: this.fb.control('22312312312', [Validators.required]),
      email: this.fb.control('3@qq.com', [Validators.required, Validators.email]),
      education: this.fb.control('本科', [Validators.required]),
      treeSelect: this.fb.control('10010', [Validators.required]),
      city: this.fb.control(["zhejiang", "hangzhou", "xihu"], [Validators.required]),
      graduate: this.fb.control([today, sevenDaysLater], [Validators.required]),
      temperature: this.fb.control('37', [Validators.required]),
      color: this.fb.control('#0cf39e', [Validators.required]),
      gender: this.fb.control('male', [Validators.required]),
      description: this.fb.control('简介', [Validators.required]),
    });
  }
  marks: NzMarks = {
    0: '0°C',
    37: '37°C',
    100: {
      style: {
        color: '#f50'
      },
      label: '<strong>100°C</strong>'
    }
  };
  readonly nzOptions: NzCascaderOption[] = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
              isLeaf: true
            }
          ]
        },
        {
          value: 'ningbo',
          label: 'Ningbo',
          isLeaf: true
        }
      ]
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
              isLeaf: true
            }
          ]
        }
      ]
    }
  ];
  readonly nodes = [
    {
      title: 'parent 1',
      key: '100',
      children: [
        {
          title: 'parent 1-0',
          key: '1001',
          children: [
            { title: 'leaf 1-0-0', key: '10010', isLeaf: true },
            { title: 'leaf 1-0-1', key: '10011', isLeaf: true }
          ]
        },
        {
          title: 'parent 1-1',
          key: '1002',
          children: [{ title: 'leaf 1-1-0', key: '10020', isLeaf: true }]
        }
      ]
    }
  ];
  labelNzSpan = 4
  controlNzSpan = 16
  passwordVisible = false
  submitForm(): void {
    console.log('Form Values:', this.validateForm.value);
    if (this.validateForm.valid) {
      this.message.success('表单提交成功！');
    } else {
      this.message.error('请检查表单是否填写正确！');
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
    }
  }
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
  }
}
