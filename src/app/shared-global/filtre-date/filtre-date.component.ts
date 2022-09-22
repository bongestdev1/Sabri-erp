import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { formatDate } from '@angular/common';
import { start } from 'repl';
import { InformationsService } from 'src/app/services/informations.service';

@Component({
  selector: 'app-filtre-date',
  templateUrl: './filtre-date.component.html',
  styleUrls: ['./filtre-date.component.scss']
})
export class FiltreDateComponent implements OnInit {

  day1
  day2

  @Output() setNewDates = new EventEmitter<any>();
  
  constructor( private informationService: InformationsService) {
    this.day1 = this.informationService.idDateFinCurrent
    this.day2 = this.informationService.idDateAujourdCurrent
  }

  ngOnInit(): void {
  }

  getOption(ch) {    
    switch (ch) {
      case 'select':
        this.day1 = new Date()
        this.day1 = new Date(this.day1.getFullYear(), 11, 31);
        this.day1 = formatDate(new Date(this.day1), 'yyyy-MM-dd', 'en')
        this.day2 = new Date();
        this.day2.setDate(this.day2.getDate());
        this.day2 = formatDate(new Date(this.day2), 'yyyy-MM-dd', 'en')
        break;
      case 'aujourdhui':
        this.day1 = new Date();
        this.day1.setDate(this.day1.getDate());
        this.day2 = new Date();
        this.day2.setDate(this.day2.getDate());
        this.day1 = formatDate(new Date(this.day1), 'yyyy-MM-dd', 'en')
        this.day2 = formatDate(new Date(this.day2), 'yyyy-MM-dd', 'en')
        break;
      case 'hier': 
        this.day1 = new Date();
        this.day1.setDate(this.day1.getDate() - 1);
        this.day2 = new Date();
        this.day2.setDate(this.day2.getDate() - 1);
        this.day1 = formatDate(new Date(this.day1), 'yyyy-MM-dd', 'en')
        this.day2 = formatDate(new Date(this.day2), 'yyyy-MM-dd', 'en')
        break;
      case 'cetteSemaine':
        const now = new Date()
        this.day2 = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 1)
        this.day1 = new Date(now.getFullYear(), now.getMonth(), this.day2.getDate() + 6)
        this.day1 = formatDate(new Date(this.day1), 'yyyy-MM-dd', 'en')
        this.day2 = formatDate(new Date(this.day2), 'yyyy-MM-dd', 'en')
        break;
      case 'semaineDernière':
        const now2 = new Date()
        this.day2 = new Date(now2.getFullYear(), now2.getMonth(), now2.getDate() - now2.getDay() - 6)
        this.day1 = new Date(now2.getFullYear(), now2.getMonth(), this.day2.getDate() + 6)
        this.day1 = formatDate(new Date(this.day1), 'yyyy-MM-dd', 'en')
        this.day2 = formatDate(new Date(this.day2), 'yyyy-MM-dd', 'en')
        break;
      case 'moisCi':
        this.day2 = new Date();
        this.day2 = new Date(this.day2.getFullYear(), this.day2.getMonth(), 1);
        this.day1 = new Date();
        this.day1 = new Date(this.day1.getFullYear(), this.day1.getMonth() + 1, 0);
        this.day1 = formatDate(new Date(this.day1), 'yyyy-MM-dd', 'en')
        this.day2 = formatDate(new Date(this.day2), 'yyyy-MM-dd', 'en')
        break;
      case 'moisFlottant':
        this.day2 = new Date();
        this.day2 = new Date(this.day2.getFullYear(), this.day2.getMonth() - 1, this.day2.getDate() - 1);
        this.day1 = new Date();
        this.day1.setDate(this.day1.getDate());
        this.day1 = formatDate(new Date(this.day1), 'yyyy-MM-dd', 'en')
        this.day2 = formatDate(new Date(this.day2), 'yyyy-MM-dd', 'en')
        break;
      case 'moisDernier':
        this.day1 = new Date();
        this.day1 = new Date(this.day1.getFullYear(), this.day1.getMonth(), 0);
        this.day2 = new Date();
        this.day2 = new Date(this.day1.getFullYear(), this.day1.getMonth(), 1);
        this.day1 = formatDate(new Date(this.day1), 'yyyy-MM-dd', 'en')
        this.day2 = formatDate(new Date(this.day2), 'yyyy-MM-dd', 'en')
        break;
      case 'cetteAnnée':
        this.day2 = new Date();
        this.day2 = new Date(this.day2.getFullYear(), 0, 1);
        this.day1 = new Date();
        this.day1 = new Date(this.day1.getFullYear(), 11, 31);
        this.day1 = formatDate(new Date(this.day1), 'yyyy-MM-dd', 'en')
        this.day2 = formatDate(new Date(this.day2), 'yyyy-MM-dd', 'en')
        break;
      case 'annéeDernière':
        this.day2 = new Date();
        this.day2 = new Date(this.day2.getFullYear() - 1, 0, 1);
        this.day2 = formatDate(new Date(this.day2), 'yyyy-MM-dd', 'en')
        this.day1 = new Date();
        this.day1 = new Date(this.day1.getFullYear() - 1, 11, 31);
        this.day1 = formatDate(new Date(this.day1), 'yyyy-MM-dd', 'en')
        break;
    }

    this.getArticles()
  }

  getArticles() {
    this.setNewDates.emit({ dateStart: formatDate(new Date(this.day2), 'yyyy-MM-dd', 'en'), dateEnd: formatDate(new Date(this.day1), 'yyyy-MM-dd', 'en') })
  }

  getDateStart(event) {
    this.day2 = event
    this.setNewDates.emit({ dateStart: this.day2, dateEnd: this.day1 })
  }

  getDateEnd(event) {
    this.day1 = event
    this.setNewDates.emit({ dateStart: this.day2, dateEnd: this.day1 })
  }
}

