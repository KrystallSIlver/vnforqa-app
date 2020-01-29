import { Component, OnInit } from '@angular/core';
import { Alternative } from './Models/alternative.model';
import { UserService } from './Services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit {

  constructor(private userSvc: UserService) {}

  title = 'app';
  alternatives: Alternative[] = [];
  markType: number = 2;

  ngOnInit() {

    this.userSvc.getCookies().subscribe( (data: any) => {
      if(data) {
        this.alternatives = data.alternatives;
        this.markType = data.markType;
      }
    });
    
  }
}
