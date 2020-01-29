import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import { TooltipModule } from 'ng2-tooltip-directive';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './Components/nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';

import {SaveToPDFComponent} from './Components/SaveToPDF/save-to-pdf.component'

import { InputAlternativesComponent } from './input-alternatives/input-alternatives.component'
import {FooterComponent} from './Components/Fotter/footer.component';
import { GoToTopButtonComponent } from './Components/go-to-top-button/go-to-top-button.component'
import { HighchartsChartModule } from 'highcharts-angular';
import { InputAlternativeMarksComponent } from './input-alternative-marks/input-alternative-marks.component';
import { ResultViewComponent } from './result-view/result-view.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AlertModalComponent } from './Components/alert-modal/alert-modal.component';
import html2canvas from 'html2canvas';
import { UserService } from './Services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    InputAlternativesComponent,
    FooterComponent,
    GoToTopButtonComponent,
    InputAlternativeMarksComponent,
    ResultViewComponent,
    SaveToPDFComponent,
    AlertModalComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    TooltipModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'results', component: ResultViewComponent },

    ]),
    HighchartsChartModule,
    BrowserAnimationsModule,

  ],
  entryComponents: [AlertModalComponent],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
