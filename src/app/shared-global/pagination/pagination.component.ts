import { Component, OnInit, Input, SimpleChanges , Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {


  @Input() page: number;
  @Input() totalPage: number;
  tabPagination = []

  constructor() { }

  ngOnInit(): void {
    
  }

  setPagination(){
    this.tabPagination = []
    for(let i=0;i<this.totalPage;i++){
      if(this.page == i+1){
        this.tabPagination.push({page: i+1 , className:"active-page" })
      }else{
        this.tabPagination.push({page: i+1 , className:"" })
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setPagination()
  }

  @Output() setPageEvent = new EventEmitter<number>();

  setPage(value: number) {
    this.setPageEvent.emit(value);
  }

  setNextPage() {
    if(this.page < this.totalPage){
      this.setPageEvent.emit(this.page+1);
    }
  }

  setLastPage(){
   this.setPageEvent.emit(this.totalPage);
  }

}
