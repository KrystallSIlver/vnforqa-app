import { Component, OnInit,Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { AnalizatorService } from '../Services/analization.service';
import { Saaty } from '../Models/saaty.model';
import { Alternative } from '../Models/alternative.model';
import { EnumsHelper } from '../Helpers/EnumsHelper';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';


@Component({
  selector: 'result-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.css'],
  providers:[EnumsHelper]
})
export class ResultViewComponent implements OnInit {

  constructor(private analizSvc: AnalizatorService, private enums: EnumsHelper) { }
  @Input() markArray: Alternative[];
  @Input() probArray: Alternative[];
  @Input() normalizedArray: Alternative[];


  saatyTable: Saaty;
  markSaatyTable: Saaty;
  saatyKolTable: Saaty;
  Saaty99Table: Saaty;
  visualTable: Saaty;

  saatyTableSorted: Alternative[];
  markSaatyTableSorted: Alternative[];
  saatyKolTableSorted: Alternative[];
  saaty99TableSorted: Alternative[];
  visualTableSorted: Alternative[];

  marks: number[] = [];
  marksMin: number = 0
  bestMark: Alternative;
  bestMarks: Alternative[];
  bestNormalized: Alternative[];
  
  probs: number[] = [];
  probsMin: number = 0;
  probsSum: number = 0;
  bestProb: Alternative;
  bestProbs: Alternative[];
  normProbs: string[] = [];
  sortedProbs: string[] = [];
  uncoloredIds: number[] = [];

  ngOnInit() {
    this.analizSvc.GetSaatyTable(this.probArray).subscribe((data: Saaty) => {
      this.analizSvc.GetMarkSaatyTable(this.markArray).subscribe((markData: Saaty) => {
        this.analizSvc.GetKolSaatyTable(this.markArray).subscribe((kolData: Saaty) => {
          this.analizSvc.GetSaaty99Table(this.probArray).subscribe((nData: Saaty) => {
            this.analizSvc.GetVisualSaaty(this.probArray).subscribe((visData: Saaty) => {
            this.saatyTable = data;
            this.markSaatyTable = markData;
            this.saatyKolTable = kolData;
            this.Saaty99Table = nData;
            this.visualTable = visData;

            this.marks = this.markArray.map(x=>x.mark);
            this.marksMin = Math.max(...this.marks)
            this.bestMark = this.markArray.find(x=>x.mark == this.marksMin)
          
            this.probs = this.probArray.map(x=>x.mark);
            this.probsMin = Math.max(...this.probs)
            this.bestProb = this.probArray.find(x=>x.mark == this.probsMin)
      
            this.bestProbs = this.sortByDesc(data.normalizedSqrts);
            this.bestMarks = this.sortByDesc(markData.normalizedSqrts);
            this.bestNormalized = this.sortByDesc(this.normalizedArray);

            this.saatyTableSorted = this.sorting(this.saatyTable.normalizedSqrts);
            this.markSaatyTableSorted = this.sorting(this.markSaatyTable.normalizedSqrts);
            this.saatyKolTableSorted = this.sorting(this.saatyKolTable.normalizedSqrts, true);
            this.saaty99TableSorted = this.sorting(this.Saaty99Table.normalizedSqrts);
            this.visualTableSorted = this.sorting(this.visualTable.normalizedSqrts);
            this.getUncoloredIds();

            });
            
          });
        });
      });
    });
  }

  sortByDesc(array: Alternative[]) {
    return array.sort((a,b) => (a.mark < b.mark) ? 1 : ((b.mark < a.mark) ? -1 : 0));
  }

  sorting(array: Alternative[], verbal: boolean = false) {
    var temp: Alternative[] = [];

    var arr = verbal ? this.bestMarks : this.bestNormalized

    arr.forEach(x => {
      temp.push(array.find(y=>y.id == x.id));
    });

    return temp;
  }

  isInteger(num: number) {
    if( num % 1 == 0) return true;
    else return false; 
  }

  getTableNumbers(num: number) {
    if(num > 1 && !this.isInteger(num)) return num.toFixed(2);
    return num < 0 ? null : num < 1 && num > 0 ? num.toFixed(2) : this.isInteger(num) || num.toFixed(1) == Math.round(num).toFixed(1) ? num : num.toFixed(1)
  }

  @ViewChild('saatyMark') saatyMark: ElementRef;
  @ViewChild('bestAlts') bestAlts: ElementRef;
  @ViewChild('saatyProp') saatyProp: ElementRef;
  
  makePdf() { 
    const bestAlts = this.bestAlts.nativeElement;
    const saatyMark = this.saatyMark.nativeElement;
    const saatyProp = this.saatyProp.nativeElement;

    const options = {background: "white" };
    let doc = new jspdf("l", "mm", "a4");

    html2canvas(bestAlts,options).then((canvas) => {
      let imgData = canvas.toDataURL("image/PNG");
      doc.addImage(imgData,'PNG',5,10);

      let pdfOutput = doc.output();
        // using ArrayBuffer will allow you to put image inside PDF
        let buffer = new ArrayBuffer(pdfOutput.length);
        let array = new Uint8Array(buffer);
        for (let i = 0; i < pdfOutput.length; i++) {
            array[i] = pdfOutput.charCodeAt(i);
        }
    }).then(() => {
      html2canvas(saatyMark,options).then((canvas) => {
        doc.addPage();

        let imgData = canvas.toDataURL("image/PNG");
        doc.addImage(imgData,'PNG',5,20);
  
        let pdfOutput = doc.output();
          // using ArrayBuffer will allow you to put image inside PDF
          let buffer = new ArrayBuffer(pdfOutput.length);
          let array = new Uint8Array(buffer);
          for (let i = 0; i < pdfOutput.length; i++) {
              array[i] = pdfOutput.charCodeAt(i);
          }
      }).then(() => {
        doc.addPage();
        html2canvas(saatyProp,options).then((canvas) => {
          let imgData = canvas.toDataURL("image/PNG");
          doc.addImage(imgData,'PNG',5,20);
    
          let pdfOutput = doc.output();
            // using ArrayBuffer will allow you to put image inside PDF
            let buffer = new ArrayBuffer(pdfOutput.length);
            let array = new Uint8Array(buffer);
            for (let i = 0; i < pdfOutput.length; i++) {
                array[i] = pdfOutput.charCodeAt(i);
            }
            doc.save("VNforQA_Result.pdf");
  
        });    
      });
    });
    
    

  }

  getNormalizedNumber(num: number) {
    var sum = this.Sum();
    var normalized = 0;
    if(sum > 0) {
      normalized = num/sum;
    } else {
      normalized = 1/this.probArray.length;
    }

    //return Math.round(normalized * 100) / 100;
    return normalized.toFixed(3);
  }

  Sum() {
    var a = 0;
    this.probArray.forEach(x=> {
      a+=x.mark;
    })
    return a;
  }

  getUncoloredIds() {
    this.normalizedArray.map(x=>x.id).forEach(id => {
      var index = this.bestMarks.map(x=>x.id).indexOf(id);
      var mark = this.bestMarks[index].mark;
      var verbal = this.bestMarks.filter(x=>x.mark == mark).map(x=>x.id);
      var indArr = [];
      for(let a of verbal) {
        indArr.push(this.bestMarks.map(x=>x.id).indexOf(a));
      }
      for(let b of indArr) {
        if(b == this.normalizedArray.map(x=>x.id).indexOf(id)) {
          this.uncoloredIds.push(id);
          break;
        }
      }
    });
  }

  getMarkColor(id: number) {    
    if(this.uncoloredIds.indexOf(id) < 0)
      return this.enums.GetColorForComparision(id);
  }

}
