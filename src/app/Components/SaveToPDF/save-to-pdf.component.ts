import { Component, ViewChild, ElementRef } from '@angular/core';
import * as jspdf from 'jspdf';  

@Component({
  selector: 'pdf',
  templateUrl: './save-to-pdf.component.html',
  styleUrls: [ './save-to-pdf.component.css' ]
})
export class SaveToPDFComponent  {
  name = 'Angular';

  @ViewChild('content') content: ElementRef;

  makePdf() { 
    let doc = new jspdf();
    doc.addHTML(this.content.nativeElement, function() {
       doc.save("VNforQA_Result.pdf");
    });
  }
}
