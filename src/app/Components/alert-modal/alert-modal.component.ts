import { Component, OnInit, Inject, Optional } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Alternative } from '../../Models/alternative.model';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css'],
  providers: [UserService]
})
export class AlertModalComponent implements OnInit {
  closeContinue: boolean = true;
  constructor(public dialogRef: MatDialogRef<AlertModalComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private userSvc: UserService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  askTemplate() {
    if(this.data == 0) {
      this.reload();
      return;
    } 
    this.closeContinue = false;
  }

  reload() {
    this.userSvc.delete().subscribe(() => {
      window.location.reload();
      this.dialogRef.close();
    });
    
  }

  reloadWithAlternatives() {
    this.userSvc.setUrel().subscribe(() => {
      window.location.reload();
      this.dialogRef.close();
    })    
  }

}
