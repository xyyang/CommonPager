## CommonPager
基于angular的分页插件

## 效果
![输入图片说明](https://gitee.com/uploads/images/2018/0103/164035_39971b71_1263866.png "pager.png")

## 集成
### step 1

####
新增在模块OrderHomeModule，文件命名为order.module.ts，代码如下

```
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from "primeng/primeng";
import { RouterConfig } from './order.router' 
import { ListComponent } from './list/list.component';

import  {ComModule} from  '../common/com.module';

@NgModule({
  imports: [
    DialogModule,
    CommonModule,
    FormsModule,
    ComModule,
    RouterModule.forChild(Rou terConfig)
  ],
  declarations: [ListComponent],
  exports: [ListComponent],
  providers: [
    
  ],
  bootstrap: []
})
export class OrderHomeModule { }

```

####
新增在组件ListComponent，文件命名为list.component.ts，代码如下

```
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { PageParam } from '../../common/pager/vo';

declare var $: any;

@Component({
    selector: 'list',
    styleUrls: ['./list.component.css'],
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
    
    @Input('pageParams') pageParams;
    
    @Output() changeCurPage: EventEmitter<Number> = new EventEmitter;
    /**
     * 分页参数
     * @type {PageParam}
     */
    curPageParam: PageParam = new PageParam(1, 10);

    /**
     * 列表记录总数
     * @type {number}
     */
    public totalCount:number = 0;
    
    constructor(private router: Router) {
    }
    
    ngOnInit() {
        
        //初始化设置总条数
       this.totalCount = 1120;
    }
    page(pageParam: PageParam) {
        this.curPageParam = pageParam;

    }
}

```
### step 2

####
在list.component.html中引入以下代码

```
<com-pager [totalCount]="totalCount" [pageIndex]="curPageParam.pageIndex" [pageSize]="curPageParam.pageSize" (paged)="page($event)"></com-pager>

```

### step 3

####
配置路由，新建文件order.router.ts

```
import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';

export const RouterConfig: Routes = [
  {
    path: '', component: OrderHomeComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListComponent }
    ]
  },
];
```
