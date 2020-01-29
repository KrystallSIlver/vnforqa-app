import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Alternative } from '../Models/alternative.model'
import { UserService } from '../Services/user.service';
@Component({
  selector: 'input-alternatives',
  templateUrl: './input-alternatives.component.html',
  styleUrls: ['./input-alternatives.component.css'],
  providers: [UserService]
})
export class InputAlternativesComponent implements OnInit {
  inputAlternatives: boolean = true;
  totalAlternativesCount: number = 5;
  choseMarks: boolean = false;
  constructor(public userSvc: UserService) { }
  
  ngOnInit() {
  }
  @Input() Alternatives: Alternative[]
  @Input() alternativesEntered:boolean;
  @Input() MarkType: number
  @Output() MarkTypeChange = new EventEmitter<number>();
  @Output() alternativesEnteredChange = new EventEmitter<boolean>();
  @Output() AlternativesChange = new EventEmitter<Alternative[]>();

  ChangeView() {
    if(!this.inputAlternatives) {
      this.ClearAlts();
    }
    for(var _i = 0; _i < this.totalAlternativesCount; _i++) {
      this.Alternatives.push(new Alternative(_i+1));
    }
    this.inputAlternatives = false;
  }

  ClearAlts() {
    if(this.Alternatives.length > 0)
      this.Alternatives = [];
  }

  SwitchView() {
    this.choseMarks = true;
  }

  ChangeViewToMarks() {
    this.CheckIsAltsEntered();
    this.userSvc.setCookies(this.Alternatives,this.MarkType).subscribe(() => {
      this.MarkTypeChange.emit(this.MarkType);
      this.AlternativesChange.emit(this.Alternatives);
      this.alternativesEntered = true;
      this.alternativesEnteredChange.emit(this.alternativesEntered);
    })
    
    
  }

  MaxChanged() {
    if(this.totalAlternativesCount > 10) this.totalAlternativesCount = 10;
    if(this.totalAlternativesCount < 1) this.totalAlternativesCount = 1;
  }

  CheckIsAltsEntered() {
    for(var _i = 0; _i < this.totalAlternativesCount; _i++)
      if(this.Alternatives[_i].name == "" || this.Alternatives[_i].name == null || this.Alternatives[_i].name == undefined)
        this.Alternatives[_i].name = "a"+(_i+1);
  }

  topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  } 

}


