import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { UtiliteService } from 'src/app/services/utilite.service';

@Component({
  selector: 'app-entete-page-list',
  templateUrl: './entete-page-list.component.html',
  styleUrls: ['./entete-page-list.component.scss']
})
export class EntetePageListComponent implements OnInit {

  @Input() list: any
  @Input() items: any
  @Input() titreFile: any
  @Input() nameFile: any


  @Input() titreDocuments: any
  @Output() gotToAdd = new EventEmitter<number>();
  @Input() acces: any

  
  @Input() control: any
  @Output() getList = new EventEmitter<number>();
  @Input() itemsVariable: any

  constructor( 
    public informationGenerale: InformationsService,
    private utilite:UtiliteService) {
  
  }

  ngOnInit(): void {
  }

  printout() {
    this.utilite.printout(this.list, this.items, this.titreFile)
  }

  generatePDF() {
    this.utilite.generatePDF(this.list, this.items, this.titreFile, this.nameFile)
  }
  
  exportexcel() {
    /* table id is passed over here */
    this.utilite.exportexcel(this.list, this.items, this.titreFile, this.nameFile)
  }
  
  getListGlob(){
    this.getList.emit();
  }

  goToAddPage(){
    this.gotToAdd.emit();
  }
}
