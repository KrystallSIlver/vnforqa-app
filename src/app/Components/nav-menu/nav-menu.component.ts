import { Component, Input, Output, EventEmitter } from '@angular/core';
import {MatDialog} from '@angular/material';
import { AlertModalComponent } from '../alert-modal/alert-modal.component'
import { Router } from '@angular/router';
import { Alternative } from '../../Models/alternative.model';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  @Input() Alternatives: Alternative[];

  constructor(public dialog: MatDialog, public router: Router) {}
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  refresh() {
    location.reload();
  }

  openDialog() {
    if(this.dialog.openDialogs.length > 0) return;
    else {
      this.dialog.open(AlertModalComponent, {
        width: '400px',
        data: this.Alternatives.length ? this.Alternatives.length : 0  
      });
    }
  }


}
