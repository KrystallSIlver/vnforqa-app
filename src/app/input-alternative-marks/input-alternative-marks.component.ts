import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Alternative } from '../Models/alternative.model';
import { b } from '@angular/core/src/render3';

@Component({
  selector: 'input-alternative-marks',
  templateUrl: './input-alternative-marks.component.html',
  styleUrls: ['./input-alternative-marks.component.css']
})
export class InputAlternativeMarksComponent implements OnInit {
  changedIds: number[] = [];


  constructor() {
   }
  MarkNames: {
    VLow: string,
    Low: string ,
    Med: string,
    High: string,
    VHigh: string } = {VHigh: "", VLow: "", Low: "", High: "", Med: ""};


  sliderView: boolean = false;

  ngOnInit() {
    const b = Object.assign([],this.Alternatives);
    b.forEach((a) => {
      var c = new Alternative(a.id)
      c.mark = 0;
      c.name = a.name;
      this.markArray.push(c);

      var d = new Alternative(a.id)
      d.mark = 4;
      d.name = a.name;
      this.probArray.push(d);
    });

    switch(this.MarkType)
    {
      case(1):
      this.MarkNames.VHigh = 'Дуже добре'
      this.MarkNames.High = 'Добре'
      this.MarkNames.Med = 'Посередньо (Байдуже)'
      this.MarkNames.Low = 'Погано'
      this.MarkNames.VLow = 'Дуже погано'
      break;
      case(2):
      this.MarkNames.VHigh = 'Категорично за'
      this.MarkNames.High = 'За'
      this.MarkNames.Med = 'Байдуже'
      this.MarkNames.Low = 'Проти'
      this.MarkNames.VLow = 'Категорично проти'
      break;
      case(3):
      this.MarkNames.VHigh = 'Абсолютно погоджуюсь'
      this.MarkNames.High = 'Погоджуюсь'
      this.MarkNames.Med = 'Не знаю'
      this.MarkNames.Low = 'Не погоджуюсь'
      this.MarkNames.VLow = 'Категорично не погоджуюсь'
      break;
    }

    this.getNormalizedArray();

  }
  @Input() Alternatives: Alternative[];
  @Input() isVisible: boolean;
  @Input() MarkType: number;
  @Input() markArray: Alternative[]
  @Input() probArray: Alternative[]
  @Input() normalizedArray: Alternative[];
  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Output() markArrayChange = new EventEmitter<Alternative[]>();
  @Output() probArrayChange = new EventEmitter<Alternative[]>();
  @Output() normalizedArrayChange = new EventEmitter<Alternative[]>();
  Id: number = 0;
  ChangeToGraphView() {
    this.normalizedArrayChange.emit(this.normalizedArray);
    //this.probRound();
    this.markArrayChange.emit(this.markArray);
    this.probArrayChange.emit(this.probArray);
    this.isVisible = true;
    this.isVisibleChange.emit(this.isVisible);
  }
  
  SwitchView() {
    this.sliderView = true;
  }

  probRound() {
    this.probArray.forEach(e => {
      var b = Math.round(e.mark);
      //if(b > 0)
      e.mark = b;
      // else 
      // e.mark = 1;
    });
  }


  getNormalizedArray() {
    this.probArray.forEach(e=> {
      var alt = new Alternative (e.id);
      alt.mark = 0//Number.parseFloat(this.getNormalizedNumber(e.mark));
      alt.name = e.name;
      this.normalizedArray.push(alt)      
    }); 
    
    this.probArray.forEach(x => {
      var num = x.mark;
      var sum = this.Sum();
      var normalized = 0;
      if(sum > 0) {
        normalized = num/sum;
      } else {
        normalized = 1/this.probArray.length;
      }
      var a = Math.round(normalized * 1000) / 1000;

      this.normalizedArray[x.id-1].mark = a;
    });
  }

  getNormValue(id: number) {
    return this.normalizedArray[id].mark ? this.normalizedArray[id].mark.toFixed(3) : (0.1).toFixed(3) ;
  }

  
  getNormalizedNumber(id: number) {
    if(this.changedIds.indexOf(id) > -1) return;
    var num = this.probArray[id-1].mark;
    var sum = this.Sum();
    var normalized = 0;
    if(sum > 0) {
      normalized = num/sum;
    } else {
      normalized = 1/this.probArray.length;
    }
    var a = Math.round(normalized * 1000) / 1000;


    this.normalizedArray[id-1].mark = a;
    
    //if(id == this.normalizedArray.length && this.Id > 0) {
          
      
    //}

    //return (this.normalizedArray[id-1].mark).toFixed(3);
    //return normalized.toFixed(3);
  }


  clarifyValues() {
    if(this.changedIds.length > 0) this.changedIds = [];
    var nSum = this.normSum();
    let idd = 0;
    if(nSum > 1) {
      let c = nSum - 1;
      c = Math.round(c * 1000) / 1000;

      let d = c/0.001 % 1 == 0 ? c/0.001 : 0;
      if(d < this.normalizedArray.length)
      if(d > 0) {

        while(this.normSum() > 1 || d > 0) {
          if(this.Id+d <= this.normalizedArray.length) {
            if(this.normalizedArray[this.Id - idd].mark > 0) {
              this.normalizedArray[this.Id + idd].mark -= 0.001;
              this.changedIds.push(this.Id + idd);
            }
          } else {
            if(this.Id == this.normalizedArray.length) idd++;
            if(this.normalizedArray[this.Id - idd].mark > 0) {
              this.normalizedArray[this.Id - idd].mark -= 0.001;
              this.changedIds.push(this.Id - idd);
            }
          }
          idd++;
          if(this.Id - idd < 0 || this.Id + idd >= this.normalizedArray.length) idd = 0;
          d--;
        }
      }
      
    } else if (1 - nSum > 0.0001) {
      let c = 1 - nSum;
      c = Math.round(c * 1000) / 1000;
      let d = c/0.001 % 1 == 0 ? c/0.001 : 0;

      if(d > 0) {

        while(this.normSum() < 1 || d > 0) {
          if(this.Id+d <= this.normalizedArray.length) {
            if(this.normalizedArray[this.Id - idd].mark < 1)
              this.normalizedArray[this.Id + idd].mark += 0.001;
          } else {
            if(this.Id == this.normalizedArray.length) idd++;
            if(this.normalizedArray[this.Id - idd].mark < 1)
              this.normalizedArray[this.Id - idd].mark += 0.001;
          }
          idd++;
          if(this.Id - idd < 0 || this.Id + idd >= this.normalizedArray.length) idd = 0;
          d--;
        }
      }
    }

  }

  Sum() {
    var a = 0;
    this.probArray.forEach(x=> {
      a+=x.mark;
    })
    return a;
  }

  normSum() {    
    var b = 0;
    this.normalizedArray.forEach(x=>{b+=x.mark})
    return b;
  }

  // checkNormSum(id: number) {
  //   var nSum = this.normSum();

  //   if(nSum > 1) {
  //     let c = nSum - 1;
  //     c = Math.round(c * 1000) / 1000;

  //     let d = c/0.001 % 1 == 0 ? c/0.001 : 0;

  //     if(d > 0) {
  //       let idd = 0;

  //       while(this.normSum() > 1 && (id+idd) < this.normalizedArray.length) {
  //         this.normalizedArray[id + idd].mark -= 0.001;
  //       }
  //     }

  //   } else if (nSum < 1) {
  //     let c = 1 - nSum;
  //     c = Math.round(c * 1000) / 1000;
  //     let d = c/0.001 % 1 == 0 ? c/0.001 : 0;

  //     if(d > 0) {
  //       let idd = 0;

  //       while(this.normSum() < 1 && (id+idd) < this.normalizedArray.length) {
  //         this.normalizedArray[id + idd].mark += 0.001;
  //       }
  //     }
  //   }
  // }

  setId($event: any) { 
    this.Id = Number.parseInt($event.target.id);
    this.clarifyValues();
  }

  topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  } 

}
