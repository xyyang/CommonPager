import { Component, EventEmitter, Input, Output } from '@angular/core';

import { PageParam } from './vo';

@Component({
  selector: 'com-pager',
  templateUrl: './pager.component.html'
})
export class PagerComponent {

  @Output()
  paged = new EventEmitter<PageParam>();

  @Input()
  pageIndex: number = 1;

  @Input()
  pageSize: number = 20;

  @Input()
  totalCount: number = 0;

  get pageCodes(): number[] {
    let pageCount: number = this.pageCount;
    let result: number[] = [];


    //初始化分页数据
    if(pageCount > 10){
      //大于10页数据
      if (this.pageIndex < 5) {
          for (var i = 1; i < 6 ; i++) {
            result.push(i);
          }
          result.push(-1);
          result.push(pageCount);
      } else if (pageCount - this.pageIndex < 4) {
          result.push(1);
          result.push(-1);
          for (var i = 1; i < 6 ; i++) {
            result.push(pageCount - 5 + i);
          }
      } else {
          result.push(1);
          result.push(-1);
          for (var i = 1; i < 5 ; i++) {
            result.push(this.pageIndex - 3 + i);
          }
          result.push(-1);
          result.push(pageCount);
      }
      /*for (var i = 1; i < 6 ; i++) {
          if (this.pageIndex < 5) {
            result.push(i);
          } else if (pageCount - this.pageIndex < 4) {
              result.push(pageCount - 5 + i);
          } else {
            result.push(this.pageIndex - 3 + i);
          }
      }*/
    }else{
        for (let i = 1; i <= pageCount; i++) {
          result.push(i);
        }
    }
    return result;
  }

  get pageCount(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  page(pageIndex: number) {
    let pageCount: number = this.pageCount;
    if(pageIndex>=1 && pageIndex<=pageCount){
      this.pageIndex = pageIndex;
      let pageParam: PageParam = new PageParam(this.pageIndex, this.pageSize);
      this.paged.emit(pageParam);
    }
  }

}

