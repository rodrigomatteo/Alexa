import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CommonService } from './services/common.service';
import { CompetitionService } from './services/competition.service';
import { StandingService } from './services/standing.service';
import { MatchService } from './services/match.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Alexa';
  status = '';
  connected = false;
  competitions: any[];

  constructor(
    private commonService: CommonService,
    private competitionService: CompetitionService,
    private standingService: StandingService,
    private matchService: MatchService
  ) { }

  ngOnInit() {
    this.testWebApiConnection();
    this.getCompetitions();
    this.getStanding();
    this.getMatchDay();
  }

  getCompetitions() {
    this.competitionService.getCompetitions()
    .subscribe(
      (data: any) => {
        this.competitions = data;
      }
    );
  }

  getStanding() {
    this.standingService.getStanding(2021, 9)
    .subscribe(
      (data: any) => {
        console.log(data);
      }
    );
  }

  getMatchDay() {
    this.matchService.getMatchDay(2021, 9)
    .subscribe(
      (data: any) => {
        console.log(data);
      }
    );
  }

  testWebApiConnection() {
    this.commonService.testWebApiConnection()
    .pipe(catchError(this.handleError))
    .subscribe(
      (res: any) => {
        console.log('Connection was ok, server is online');
        this.status = 'Connection was ok, server is online';
        this.connected = true;
      },
      err => {this.status = err; }
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(` The server is NOT online: ${error.message} `);
  }

}
