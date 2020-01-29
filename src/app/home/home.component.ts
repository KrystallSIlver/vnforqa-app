import { Component, OnInit, enableProdMode, Input, Output } from '@angular/core';
import { Vote,MarkModel } from "../Models/Vote.model"
import { Alternative } from '../Models/alternative.model'
import { UserService } from '../Services/user.service';
import { User } from '../Models/user.model';
import { EventEmitter } from 'events';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../Styles/style.css'],
  providers: [UserService]
})


export class HomeComponent implements OnInit {
  isAlternativesEntered: boolean = false;
  votes: Vote[] = [];
  isResultView: boolean = false;
  //alternatives: Alternative[] = [];
  //markType: number = 2;
  markArray: Alternative[] = [];
  probArray: Alternative[] = [];
  normalizedArray: Alternative[] = [];
  constructor(private userSvc: UserService) { }

  @Input() alternatives: Alternative[];
  @Input() markType: number;
  @Output() alternativesChanged = new EventEmitter<Alternative[]>();

  ngOnInit() {
    // this.userSvc.newUser().subscribe((data:User) => {
    //   this.user = data;
    // });
    this.userSvc.getCookies().subscribe( (data: any) => {
      if(data) this.isAlternativesEntered = true;      
    });
    
  }
  
} 