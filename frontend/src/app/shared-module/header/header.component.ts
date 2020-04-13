import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'cs-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  public date = moment().format('LLLL');
  
  constructor() { 
    this.displayDate();
  }

  displayDate() : void {
    setInterval(() => {
      this.date = moment().format('LLLL');
    }, 1000);
  }
    
  ngOnInit() {
  }

}
